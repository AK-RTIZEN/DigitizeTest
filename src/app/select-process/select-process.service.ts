import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Process } from '../process.model';

@Injectable({providedIn: 'root' })
export class SelectProcessService {

    constructor(private http : HttpClient){}

    fetchProcess() {
        return this.http
        .get(
        'http://localhost/api/c.php',
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
            //console.log(response);
            return response;
        })
        )
    }
}