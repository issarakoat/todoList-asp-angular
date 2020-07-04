import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoModel } from './todo.model';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  onFetching() {
    return this.http.get<TodoModel>(environment.url + 'TodoItems');
  }
  onCreate(todo: TodoModel) {
    console.log(todo);
    return this.http.post(
      environment.url + 'TodoItems',
      todo
    );
  }
  onDelete(id: number) {
    return this.http.delete(environment.url + 'TodoItems/' + id);
  }
  onUpdate(id: number, name: string, isComplete: string) {
    return this.http.put(environment.url + 'TodoItems/' + id + '.json', {
      name: name,
      isComplete: isComplete,
    });
  }
}
