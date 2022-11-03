import { Component, OnInit } from '@angular/core';
import { Folder } from '../folder/folder.component';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-personal-folders',
  templateUrl: './personal-folders.component.html',
  styleUrls: ['./personal-folders.component.css']
})
export class PersonalFoldersComponent implements OnInit {

  folders: Folder[] = [];
  newFolder: Folder = {id: "", name: "", public: false, uid: ""};
  subscription: Subscription = new Subscription;

  constructor(public data: DatabaseService, private router : Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.onGetFolders();
  }

  onGetFolders(): void {
    this.auth.uid.subscribe({
      next: (uid: string) => {
        this.subscription = this.data.getPersonalFolders(uid).subscribe(
          folders => {
            console.log("are you even doing this")
            this.folders = folders;
          }
        )
      }
    })
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
