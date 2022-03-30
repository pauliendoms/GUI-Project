import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  txt: string = "";

  constructor() {}

  ngOnInit(): void {
  }

  empty(): boolean {
    return this.txt === '';
  }

  clear(): void {
    this.txt = '';
  }

}
