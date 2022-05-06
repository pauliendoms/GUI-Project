import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './card/card.component';
import { Folder } from './folder/folder.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getFolders() : Observable<Folder[]> {
    const url = "http://localhost:3000/folders";
    return this.http.get<Folder[]>(url);
  }

  getCards(folder: string) : Observable<Card[]> {
    console.log("hello");
    console.log(folder);
    const url = "http://localhost:3000/folders/" + folder;
    return this.http.get<Card[]>(url);
  }
}
