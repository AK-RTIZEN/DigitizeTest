import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { Customer } from '../customer.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  loadedCustomers : Customer[] = [];
  recentCustomers : Customer[] = [];

  constructor(private http : HttpClient, private router : Router) { }


  ngOnInit() {

    this.http
    .get(
      //'https://account-dot-digitize.appspot.com/startNewCurrent',
      'http://localhost/api/b.php',
      //'http://mediartizen.com/api/a.php',
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
      }
      )
      .pipe(map((responseData : {[key : string] : Customer}) => {
        const response : Customer[] = [];
        for( const obj in responseData) {
          if(responseData.hasOwnProperty(obj)) {
            for(const x in responseData[obj]["details"]){
              response.push(responseData[obj]["details"][x])
            }
          }
        }
        //console.log(response);
        return response;
      })
      )
      .subscribe(
        customers => {
          this.recentCustomers = customers;
        }
      );

  }

  searchApplicant(postData: { cstName : string }) {
    //console.log(postData);
    this.http
    .post(
      //'https://account-dot-digitize.appspot.com/startNewCurrent',
      'http://localhost/api/a.php',
      //'http://mediartizen.com/api/a.php',
      postData,
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
      }
      )
      .pipe(map((responseData : {[key : string] : Customer}) => {
        const response : Customer[] = [];
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
          this.loadedCustomers = customers;
        }
      );
  }

  onClickCustomer(acctId : string) {
    //console.log(acctId);
    this.router.navigate(['/upload-document', acctId]);
  }


  

}
