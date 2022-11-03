import { Component, OnInit } from '@angular/core';
import { Folder } from '../folder/folder.component';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-public-folders',
  templateUrl: './public-folders.component.html',
  styleUrls: ['./public-folders.component.css']
})
export class PublicFoldersComponent implements OnInit {

  folders: Folder[] = [];
  newFolder: Folder = {id: "", name: "", public: false, uid: ""};
  subscription: Subscription = new Subscription;

  constructor(public data: DatabaseService, private router : Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.onGetFolders();
  }

  onGetFolders(): void {
    this.subscription = this.data.getPublicFolders().subscribe(
      folders => {
        console.log("are you even doing this")
        this.folders = folders;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
