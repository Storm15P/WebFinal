import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  public listaResenas: any = { resenasEncontradas: [] };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    var token = sessionStorage.getItem("session_token");

    var url = "http://localhost:9898/api/resenas";

    var headers = new HttpHeaders().set('Authorization', token || '');

    this.http.get(url, { headers }).subscribe({
      next: (resp: any) => {
        this.listaResenas = resp;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
