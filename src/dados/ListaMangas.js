import Manga from "./Manga";

export default class ListaMangas {
    constructor() {
        this.mangas = [];
        this.mangaSelecionado = new Manga();
        this.estadoSelecionado = "Ativo";
        this._inscritos = [];
        this.idseq = 0;
        this.apiUrl = 'https://thalesmangaapi.azurewebsites.net//api/manga';
        //this.apiUrl = 'https:/localhost:5001/api/manga';
        this.token = localStorage.getItem('@mangalauncher/token');
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

    addManga(nome) {
        if (nome != "") {
            const manga = new Manga(nome, this.estadoSelecionado);
            this.postManga(manga);
        }
    }

    padToTwo(number) {
        if (number<=9) { number = ("0"+number).slice(-2); }
        return number;
    }

    proximoCap() {
        if (this.mangaSelecionado.Nome != "") {
            const capAtual = parseInt(this.mangaSelecionado.CapituloAtual,10) + 1;
            window.open('http://unionleitor.top/leitor/' + this.mangaSelecionado.Nome + '/' + this.padToTwo(capAtual),'_blank');
            this.atualizaCap(capAtual);
        }
    }

    async atualizaEstado(Estado) {
        if (this.mangaSelecionado.Nome != "") {
            this.mangaSelecionado.Estado = Estado;
            await this.putManga(this.mangaSelecionado)
            const index = this.mangas.indexOf(this.mangaSelecionado);
            this.mangas.splice(index, 1);
            this.notificar();
        }
    }

    async atualizaCap(capAtual) {
        if (this.mangaSelecionado.Nome != "") {
            this.mangaSelecionado.CapituloAtual = capAtual;
            await this.putManga(this.mangaSelecionado)
            const index = this.mangas.indexOf(this.mangaSelecionado);
            this.mangas.splice(index, 1, this.mangaSelecionado);
            this.notificar();
        }
    }

    selManga(id) {
        const sels = this.mangas.filter(m => m.Id == id);
        this.mangaSelecionado = sels[0];
        this.notificar();
    }

    selEstado(estado) {
        this.estadoSelecionado = estado;
        this.getManga();
    }

    async getManga() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token }
        };
        const response = await fetch(this.apiUrl + '/' + this.estadoSelecionado, requestOptions);
        const json = await response.json();

        this.mangas = [];
        json.Dados.forEach(manga => {
            this.mangas = [...this.mangas, manga]
        });

        this.notificar();
    }

    async postManga(manga) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token },
            body: JSON.stringify(manga)
        };
        const response = await fetch(this.apiUrl, requestOptions);
        const json = await response.json();

        if (response.status == 200) {
            this.mangas.push(json.Dados);
            this.notificar();
        } else {
            console.log(json.erro)
        }

    }

    async putManga(manga) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token },
            body: JSON.stringify(manga)
        };
        const response = await fetch(this.apiUrl, requestOptions);
        const json = await response.json();
    }

    async deleteManga() {
        await fetch((this.apiUrl), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': 'Bearer ' + this.token },
            body: JSON.stringify(this.mangaSelecionado)
        });

        const index = this.mangas.indexOf(this.mangaSelecionado);
        this.mangas.splice(index, 1);
        this.notificar(index);
    }
}