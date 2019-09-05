import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Customer } from '../customer.model';

@Injectable({providedIn: 'root' })
export class LandingService {

    loadedCustomers : Customer[] = [];
    
    constructor(private http : HttpClient) {}

    searchApplicant(postData: {cstName : string}){
        //..
        return this.http
        .post(
        'http://localhost/api/a.php',
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
            //console.log(response);
            return response;
        })
        );
    }

    recentApplicant() {
        return this.http
        .get(
        'http://localhost/api/b.php',
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
    }
}