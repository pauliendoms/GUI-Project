import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quizsettings',
  templateUrl: './quizsettings.component.html',
  styleUrls: ['./quizsettings.component.css']
})
export class QuizsettingsComponent implements OnInit {

  constructor(public data : DatabaseService) { }

  quizsettings : Quizsettings = {
    theme: "",
    amount: 1,
    repetitive: false,
  }

  selected : string = "";

  error: string = "";

  @Output() quizStart = new EventEmitter<Quizsettings>();

  ngOnInit(): void {
    this.data.updateFolders();
  }

  async startQuiz() {
    console.log(this.quizsettings);

    if (this.quizsettings.theme == "") {
      this.error = "Combination not possible";
      return;
    } else if (this.quizsettings.amount == null) {
      this.error = "Combination not possible";
      return;
    } else if (!(await this.checkFolderLength(this.quizsettings.theme))) {
      this.error = "Combination not possible";
      return;
    }



    console.log("starting");
    this.quizStart.emit(this.quizsettings);
  }

  async checkFolderLength(foldername: string) {
    let folderId = 0;

    for (let folder of this.data.folders) {
      if (folder.name == foldername) {
        folderId = folder.id;
      }
    }

    await this.data.updateCards(folderId);
    if (this.data.cards.length == 0) {
      return false;
    } else {
      return true;
    }
  }

}

export interface Quizsettings {
  theme: string,
  amount: number,
  repetitive: boolean,
}
