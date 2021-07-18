import { Injectable } from '@angular/core';
import { StoreBase } from './store.base';

interface Todos {
  todos: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TodosStore extends StoreBase<Todos> {
  protected createDefaultStore(): Todos {
    return { todos: [] };
  }
}
