import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Document } from '../document.model';
import { Customer } from '../customer.model';

@Injectable({providedIn: 'root'})
export class PrintDocumentService {

    constructor(private http : HttpClient) {}

    api : string = null;

    loadForms(postData: {acctId : string}){
        
        
        this.api = 'http://localhost/api/h.php';
        
        return this.http
        .post(
        this.api,
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

    loadFormsDetails(postData: {acctId : string}) {
        
        this.api = 'http://localhost/api/h.php';
        
        return this.http
        .post(
        this.api,
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