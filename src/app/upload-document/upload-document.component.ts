import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

import { Document } from '../document.model';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  loadedDocumentsDetails : Document[] = [];
  loadedCustomerDetails : Customer[] = [];

  constructor(private http : HttpClient, private route : ActivatedRoute) { }

  ngOnInit() {
    let acctId : string = this.route.snapshot.paramMap.get('acctId');
    //console.log(acctId);

    this.onloadDocuments({acctId});
    this.onloadDocumentsDetails({acctId});
    
    
  }

  onloadDocuments(postData: {acctId : string}) {
    //console.log(postData);
    this.http
    .post(
      //'https://account-dot-digitize.appspot.com/startNewCurrent',
      'http://localhost/api/d.php',
      //'http://mediartizen.com/api/a.php',
      postData,
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
      }
      )
      .pipe(map((responseData :  Customer  ) => {
        const response = [];
        response.push(responseData);
        //console.log(response);
        return response;
      })
      )
      .subscribe(
        documents => {
          this.loadedCustomerDetails = documents;
        }
      );
  }

  onloadDocumentsDetails(postData: {acctId : string}) {
    //console.log(postData);
    this.http
    .post(
      //'https://account-dot-digitize.appspot.com/startNewCurrent',
      'http://localhost/api/d.php',
      //'http://mediartizen.com/api/a.php',
      postData,
      {
        headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
      }
      )
      .pipe(map((responseData :  Document  ) => {
        const response : Document[] = [];
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
        documents => {
          this.loadedDocumentsDetails = documents;
        }
      );
  }

}
