import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  estadoSalvar = 'post';
  form = {} as FormGroup;

  get f(): any{
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService)
  {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventosById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar Evento.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validacao();
  }

  public validacao(): void{
    this.form = this.fb.group({
      tema: ['',
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['',
        [Validators.required, Validators.max(1000)],
      ],
      telefone: ['', Validators.required],
      email: ['',
        [Validators.required, Validators.email],
      ],
      imagemURL: ['', Validators.required]
    })
  }

  public limparForm(): void{
    this.form.reset();
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar == "post") {
        this.adicionarEvento();
      } else {
        this.editarEvento();
      }
    }
  }

  private adicionarEvento(): void{
     this.evento = {...this.form.value}

    this.eventoService.adicionarEvento(this.evento).subscribe(
      () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error('Error ao salvar evento', 'Erro');
      },
      () => this.spinner.hide()
    );
  }

  private editarEvento(): void{
    this.evento = {id: this.evento.id, ...this.form.value};

    this.eventoService.editarEvento(this.evento).subscribe(
      () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toastr.error('Error ao salvar evento', 'Erro');
      },
      () => this.spinner.hide()
    );
  }
}
