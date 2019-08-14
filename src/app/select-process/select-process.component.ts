import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Process } from '../process.model';

@Component({
  selector: 'app-select-process',
  templateUrl: './select-process.component.html',
  styleUrls: ['./select-process.component.css']
})
export class SelectProcessComponent implements OnInit {

  loadedProcess : Process[] = [];

  constructor(private http : HttpClient) { }

  ngOnInit() {

    this.http
    .get(
      //'https://account-dot-digitize.appspot.com/startNewCurrent',
      'http://localhost/api/c.php',
      //'http://mediartizen.com/api/a.php',
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
      }
      )
      .pipe(map((responseData : {[key : string] : Process}) => {
        const response : Process[] = [];
        for( const obj in responseData) {
          if(responseData.hasOwnProperty(obj)) {
            for(const x in responseData[obj]["details"]){
              response.push(responseData[obj]["details"][x])
            }
          }
        }
        console.log(response);
        return response;
      })
      )
      .subscribe(
        customers => {
          this.loadedProcess = customers;
        }
      );


  }

}
