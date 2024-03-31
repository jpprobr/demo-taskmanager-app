import { Component, OnInit } from '@angular/core';

import { Tarefa } from '../../models/tarefa';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
})
export class TarefaListaComponent implements OnInit {
  tarefas: Tarefa[];
  errorMessage: string = '';

  constructor(private tarefasService: TarefasService) { }

  ngOnInit() {
    this.obterTarefas();
  }

  obterTarefas() {
    this.tarefasService.obterTarefas().subscribe(
      tarefas => {
        this.tarefas = tarefas;
      },
      error => this.errorMessage = <any>error
    );
  }

  excluirTarefa(id: string, name: string): void {
    if (id === '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir a tarefa: ${name}?`)) {
        this.tarefasService.excluirTarefa(id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  onSaveComplete(): void {

    this.tarefasService.obterTarefas().subscribe(
      tarefas => {
        this.tarefas = tarefas;
      },
      error => this.errorMessage = <any>error
    );
  }
}
