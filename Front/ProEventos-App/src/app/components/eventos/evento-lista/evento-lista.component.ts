import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  public eventosFiltrados: Evento[] = [];
  public eventos: Evento[] = [];
  widthImg: number = 100;
  marginImg = 2;
  mostrarImg: boolean = true;
  private _searchList: string = "";
  modalRef = {} as BsModalRef;

  public get searchList() : string{
    return this._searchList;
  }

  public set searchList(value: string){
    this._searchList = value;
    this.eventosFiltrados = this.searchList ? this.filtrarEventos(this.searchList) : this.eventos;
    console.log(this.eventosFiltrados)
  }

  filtrarEventos(filtrarPor: string) : Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  mostrarColunaImg(){
    this.mostrarImg = !this.mostrarImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide(),
        this.toastr.error('Erro ao carregar os Eventos', 'Erro!');
      },
      complete: () => {
        this.spinner.hide()
      }
    });
  }

  openModal(template: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void{
    this.modalRef.hide();
    this.toastr.success('O evento foi deletado com sucesso!', 'Deletado');
  }

  decline(): void{
    this.modalRef.hide();
  }

  detalheEvento(id: number): void{
this.router.navigate([`eventos/detalhe/${id}`])
  }
}
