import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './todo.service';
import { map, flatMap } from 'rxjs/operators';
import { TodoModel } from './todo.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  todos: TodoModel[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.onFetchPosts();
  }
  onCreateTodo(todo: TodoModel) {
    todo.isComplete = false;
    this.todoService.onCreate(todo).subscribe(res => {
      this.onFetchPosts();
      this.form.form.reset();
    });
  }
  onDelete(id: number){
    this.todoService.onDelete(id).subscribe( res => {
      this.onFetchPosts();
    });
  }
  onFetchPosts() {
    this.todoService
      .onFetching()
      .pipe(
        map((responsData) => {
          const todosArray: TodoModel[] = [];
          for (const key in responsData) {
            if (responsData.hasOwnProperty(key)) {
              todosArray.push({ ...responsData[key], id: key });
            }
          }
          return todosArray;
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.todos = responseData;
      });
    // Send Http request
  }
}
