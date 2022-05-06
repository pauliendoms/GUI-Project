import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flashy';

  userentries: {username: String, password: String}[] = [];

  onClickEvent(userentry: {username: String, password: String}) : void {
    this.userentries.push(userentry);
  }
}
