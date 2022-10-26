import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folderview',
  templateUrl: './folderview.component.html',
  styleUrls: ['./folderview.component.css']
})
export class FolderviewComponent implements OnInit {
  folders: Folder[] = [];
  newFolder: Folder = {id: "", name: ""};
  subscription: Subscription = new Subscription;

  constructor(public data: DatabaseService, private router : Router) { }

  ngOnInit(): void {
    this.onGetFolders();
  }

  onAddFolder() : void {
    if (this.newFolder.name != "") {
      this.data.addFolder(this.newFolder);
      this.newFolder.name = "";
    }
  }

  onGetFolders(): void {
    this.subscription = this.data.getFolders().subscribe(
      folders => {
        this.folders = folders;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
