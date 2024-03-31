import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tarefa } from '../../models/tarefa';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefa-cadastro',
  templateUrl: './tarefa-cadastro.component.html',
  styleUrls: ['./tarefa-cadastro.component.css']
})
export class TarefaCadastroComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  pageTitle: string = 'Adicionar Tarefa';
  formMode: string;
  tarefa: Tarefa;
  tarefaForm: FormGroup;
  showStatus: Boolean;
  validationMessages: { [Key: string]: { [key: string]: string } }
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tarefasService: TarefasService
  ) {
    this.validationMessages = {
      nome: {
        required: 'Nome é obrigatório',
        minlength: 'Nome deve ter ao menos 3 caracteres',
        maxlength: 'Nome não pode exceder 50 caracteres',
      },
      detalhes: {
        minlength: 'Nome deve ter ao menos 3 caracteres',
        maxlength: 'Nome não pode exceder 100 caracteres',
      }
    };
  }

  ngOnInit() {
    this.formMode = 'new';
    this.tarefaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      detalhes: ['', [Validators.minLength(3), Validators.maxLength(1000)]],
      concluido: ['', []]
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id == null || id == '') {
          const tarefa: Tarefa = { id: "", nome: "", detalhes: "", concluido: false };
          this.exibirTarefa(tarefa);
        }
        else {
          this.obterTarefa(id);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  obterTarefa(id: string): void {
    this.tarefasService.obterTarefa(id)
      .subscribe(
        (tarefa: Tarefa) => this.exibirTarefa(tarefa),
        (error: any) => this.errorMessage = <any>error
      )
  }

  exibirTarefa(tarefa: Tarefa): void {

    if (this.tarefaForm) {
      this.tarefaForm.reset();
    }

    this.tarefa = tarefa;

    if (this.tarefa.id == '') {
      this.pageTitle = 'Adicionar tarefa';
      this.showStatus = false;
    } else {
      this.pageTitle = `Editar tarefa: ${this.tarefa.nome}`;
      this.showStatus = true;
    }

    this.tarefaForm.patchValue({
      nome: this.tarefa.nome,
      detalhes: this.tarefa.detalhes,
      concluido: this.tarefa.concluido
    });
  }

  excluirTarefa(): void {
    if (this.tarefa.id == '') {
      this.onSaveComplete();
    }
    else {
      if (confirm(`Tem certeza que deseja excluir a tarefa: ${this.tarefa.nome}?`)) {
        this.tarefasService.excluirTarefa(this.tarefa.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  salvar(): void {

    if (this.tarefaForm.valid) {
      if (this.tarefaForm.dirty) {

        const t = { ...this.tarefa, ...this.tarefaForm.value };

        if (t.id === '') {
          console.log('Criando tarefa: ', t);
          this.tarefasService.criarTarefa(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          console.log('Atualizando tarefa: ', t);
          this.tarefasService.atualizarTarefa(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Por favor corrija os erros de validação. ';
    }
  }

  onSaveComplete(): void {
    this.tarefaForm.reset();
    this.router.navigate(['/tarefas']);
  }
}
