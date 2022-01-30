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
  public eventoId = 0;
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
    this.carregarEventos();
  }

  mostrarColunaImg(){
    this.mostrarImg = !this.mostrarImg;
  }

  public carregarEventos(): void {
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

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService.deletarEvento(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado!');
          this.carregarEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void{
    this.modalRef.hide();
  }

  detalheEvento(id: number): void{
this.router.navigate([`eventos/detalhe/${id}`])
  }
}
