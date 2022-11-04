import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-folderview',
  templateUrl: './folderview.component.html',
  styleUrls: ['./folderview.component.css']
})
export class FolderviewComponent implements OnInit {
  folders: Folder[] = [];
  newFolder: Folder = {id: "", name: "", public: false, uid: ""};
  subscription: Subscription = new Subscription;

  constructor(public data: DatabaseService, private router : Router, private auth: AuthService) { }

  admin: boolean = false;

  ngOnInit(): void {
    this.auth.admin.subscribe({
      next: (res: boolean) => {
        this.admin = res;
        console.log(this.admin)
      }
    })
  }

  onAddFolder() : void {
    this.newFolder.uid = this.auth.getId()!;
    if (this.newFolder.name != "") {
      this.data.addFolder(this.newFolder);
      this.newFolder.name = "";
    }
  }

}
