import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Folder } from '../folder/folder.component';

@Component({
  selector: 'app-folderview',
  templateUrl: './folderview.component.html',
  styleUrls: ['./folderview.component.css']
})
export class FolderviewComponent implements OnInit {
  folders: Folder[] = [];

  constructor(private databaseService : DatabaseService) { }

  ngOnInit(): void {
    this.onGetFolders();
    console.log(this.folders);
  }

  onGetFolders() : void {
    this.databaseService.getFolders().subscribe(
      (response : Folder[]) => {
        console.log('received:', response);
        this.folders = response;
      },
      (error) => console.log('error', error),
      () => console.log(this.folders)
    );
  }

}
