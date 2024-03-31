import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarefaCadastroComponent } from './tarefas/components/tarefa-cadastro/tarefa-cadastro.component';
import { TarefaListaComponent } from './tarefas/components/tarefa-lista/tarefa-lista.component';

const routes: Routes = [
  { path: '', component: TarefaListaComponent },
  { path: 'tarefas', component: TarefaListaComponent },
  { path: 'tarefas/cadastrar', component: TarefaCadastroComponent },
  { path: 'tarefas/:id/editar', component: TarefaCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
