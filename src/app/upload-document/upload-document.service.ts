import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Document } from '../document.model';
import { Customer } from '../customer.model';

@Injectable({providedIn: 'root'})
export class UploadDocumentService {

    constructor(private http : HttpClient) {}

    loadDocuments(postData: {acctId : string}){
        return this.http
        .post(
        'http://localhost/api/d.php',
        postData,
        {
            headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
        }
        )
        .pipe(map((responseData :  Customer  ) => {
            const response = [];
            response.push(responseData);
            return response;
        })
        );
    }

    loadDocumentDetails(postData: {acctId : string}) {
        return this.http
        .post(
        'https://account-dot-digitize.appspot.com/onClickCstName',
        //'http://localhost/api/d.php',
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
            
            return response;
        })
        );
    }
}