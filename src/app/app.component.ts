import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http';
  constructor(private http: HttpClient) {}
  sendRequest() {
    this.http.get('http://jsonplaceholder.typicode.com/todos/1').subscribe(val => console.log(val));
  }
}
