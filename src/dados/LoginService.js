import User from "./User";

export default class LoginService {
    constructor() {
        this._inscritos = [];
        this.apiUrl = 'https://thalesuserapi.azurewebsites.net//api/login';
        //this.apiUrl = 'https:/localhost:5001/api/login';
        this.logado = false;
        this.invalidLogin = false;
    }

    inscrever(func) {
        if (!this._inscritos.includes(func)) {
            this._inscritos = [...this._inscritos, func];
        }
    }

    desinscrever(func) {
        this._inscritos = this._inscritos.filter(f => f !== func)
    }

    notificar() {
        this._inscritos.forEach(func => func(this));
    }

    loginInicial() {
        const username = localStorage.getItem('@mangalauncher/user');
        const password = localStorage.getItem('@mangalauncher/password');        
        this.login(username, password);
    }

    login(username, password) {
        if (username && password) {
            const user = new User(username, password);
            this.postLogin(user);
        }
    }

    async postLogin(user) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        const response = await fetch(this.apiUrl, requestOptions);
        const json = await response.json();

        if (response.status == 200) {
            this.logado = true;
            this.invalidLogin = false;
            localStorage.setItem('@mangalauncher/user', user.username);
            localStorage.setItem('@mangalauncher/password', user.password);
            localStorage.setItem('@mangalauncher/token', json.access_token);
            this.notificar();
        } else {
            this.logado = false;
            this.invalidLogin = true;
            this.notificar();
        }
    }
}