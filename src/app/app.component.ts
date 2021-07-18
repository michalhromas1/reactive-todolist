import { Component, OnInit } from '@angular/core';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-root',
  template: ``,
})
export class AppComponent implements OnInit {
  todos$ = this.todosStore.store$;

  constructor(private todosStore: TodosStore) {}

  ngOnInit(): void {
    this.todos$.subscribe();
    this.todosStore.update({ todos: [1, 2, 3] });
    this.todosStore.update({ todos: [1, 2, 3, 4] });
    this.todosStore.update({ todos: [1, 3, 4] });
  }
}
