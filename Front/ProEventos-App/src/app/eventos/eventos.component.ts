import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg: number = 100;
  marginImg = 2;
  mostrarImg: boolean = true;
  private _searchList: string = "";

  public get searchList() : string{
    return this._searchList;
  }

  public set searchList(value: string){
    this._searchList = value;
    this.eventosFiltrados = this.searchList ? this.filtrarEventos(this.searchList) : this.eventos;
    console.log(this.eventosFiltrados)
  }

  filtrarEventos(filtrarPor: string) : any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  mostrarColunaImg(){
    this.mostrarImg = !this.mostrarImg;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/Eventos').subscribe(
      (response) => {
        (this.eventos = response);
        this.eventosFiltrados = this.eventos;
      },

      (error) => console.log(error)
    );
  }
}
