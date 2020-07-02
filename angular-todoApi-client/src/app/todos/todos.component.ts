import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { map } from "rxjs/operators";
import { TodoModel } from './todo.model'
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
     this.onFetchPosts();
  }
  onFetchPosts() {

    this.todoService
      .onFetching()
      .pipe(
        map((responsData) => {
          const postsAarray: TodoModel[] = [];
          for (const key in responsData) {
            if (responsData.hasOwnProperty(key)) {
              postsAarray.push({ ...responsData[key], id: key });
            }
          }
          return postsAarray;
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
    // Send Http request
  }

}
