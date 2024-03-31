import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private urlApi = `${environment.baseUrl}/api/tarefas`;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  obterTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.urlApi)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  obterTarefa(id: string): Observable<Tarefa> {

    if (id === '') {
      return of(this.inicializarTarefa());
    }

    const urlId = `${this.urlApi}/${id}`;

    return this.http.get<Tarefa>(urlId)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  criarTarefa(tarefa: Tarefa) {
    return this.http.post<Tarefa>(this.urlApi, tarefa, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.tratarErro)
      );
  }

  atualizarTarefa(tarefa: Tarefa) {
    const urlId = `${this.urlApi}/${tarefa.id}`;

    return this.http.put<Tarefa>(urlId, tarefa, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.tratarErro)
      );
  }

  excluirTarefa(id: string) {
    const urlId = `${this.urlApi}/${id}`;

    return this.http.delete<Tarefa>(urlId, { headers: this.jsonHeaders })
      .pipe(
        catchError(this.tratarErro)
      );
  }

  private tratarErro(err) {
    let msgErro: string;

    if (err.error instanceof ErrorEvent) {
      msgErro = `Ocorreu um erro: ${err.error.message}`;
    }
    else {
      msgErro = `Ocorreu um erro na API. StatusCode: ${err.status}, Desc.: ${err.body.error}`;
    }

    return throwError(msgErro);
  }

  private inicializarTarefa(): Tarefa {
    return {
      id: null,
      nome: null,
      detalhes: null,
      concluido: false
    }
  }
}
