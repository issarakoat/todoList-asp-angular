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
  @ViewChild('checkBox', { static: false }) checkBox: NgForm;
  todos: TodoModel[];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.onFetchPosts();
  }
  onCreateTodo(todo: TodoModel) {
    todo.isComplete = false;
    this.todoService.onCreate(todo).subscribe((res) => {
      this.onFetchPosts();
      this.form.form.reset();
    });
  }
  onDelete(id: number) {
    this.todoService.onDelete(id).subscribe((res) => {
      this.onFetchPosts();
    });
  }
  onUpdate(todo: TodoModel) {
    todo.isComplete = !todo.isComplete;
    console.log(todo);
    this.todoService.onUpdate(todo).subscribe();
  }
  onFetchPosts() {
    this.todoService
      .onFetching()
      .toPromise()
      .then((res) => {
        console.log(res);
        this.todos = res;
      });
  }
}
