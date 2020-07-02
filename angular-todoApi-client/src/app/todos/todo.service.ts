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
}
