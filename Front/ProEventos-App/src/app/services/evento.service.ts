import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '../models/Evento';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:5001/api/Eventos';

  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL).pipe(take(1));
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`)
    .pipe(take(1));
  }

  public getEventosById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`)
    .pipe(take(1));
  }

  public adicionarEvento(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.baseURL, evento)
      .pipe(take(1));
  }

  public editarEvento(evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deletarEvento(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }
}
