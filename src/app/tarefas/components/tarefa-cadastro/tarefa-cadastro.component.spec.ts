import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaCadastroComponent } from './tarefa-cadastro.component';

describe('TarefaCadastroComponent', () => {
  let component: TarefaCadastroComponent;
  let fixture: ComponentFixture<TarefaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
