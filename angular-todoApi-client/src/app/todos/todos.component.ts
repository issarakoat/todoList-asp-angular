import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { map } from "rxjs/operators";
import { TodoModel } from './todo.model'
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: TodoModel[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
     this.onFetchPosts();
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
