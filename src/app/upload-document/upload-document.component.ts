import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

import { UploadDocumentService } from './upload-document.service';

import { Document } from '../document.model';
import { Customer } from '../customer.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  loadedDocumentsDetails : Document[] = [];
  loadedCustomerDetails : Customer[] = [];
  uploadedDocumentDetails = [];
  errorRes1 = null;
  errorRes2 = null;
  selectedFile : File = null;

  public imgURL: any;
  public imgPath: any;
  public abc: any;

  constructor(private http : HttpClient, private uploadDocumentService : UploadDocumentService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    let acctId : string = this.route.snapshot.paramMap.get('acctId');

    this.onloadDocuments({acctId});
    this.onloadDocumentsDetails({acctId});   
     
  }

  onloadDocuments(postData: {acctId : string}) {
    this.uploadDocumentService.loadDocuments(postData)
      .subscribe(
        documents => {
          this.loadedCustomerDetails = documents;
        },
        error => {
          this.errorRes1 = error.name;
        }
      );
  }

  onloadDocumentsDetails(postData: {acctId : string}) {
    this.uploadDocumentService.loadDocumentDetails(postData)
    .subscribe(
        documents => {
          this.loadedDocumentsDetails = documents;
        },
        error => {
          this.errorRes2 = error.name;
        }
      );
  }

  onFileSelected(event, files, docName) {
    console.log(docName);
    this.selectedFile = <File>event.target.files[0];

    if (files.length === 0)
      return;
 
    var reader = new FileReader();
    this.imgPath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => {
        this.imgURL = reader.result; 
      this.abc = docName;
    }
  }


  onUpload(docName : string) {
    const fd = new FormData;
    fd.append('docType', docName);
    fd.append('payload', this.selectedFile, this.selectedFile.name);
    
    this.http.post('http://localhost/api/f.php', fd)
    .pipe(map((responseData :  Customer  ) => {
      const response = [];
      for( const obj in responseData){
        response.push(responseData[obj]);
      }
      return response;
    })
    )
    .subscribe(res=>{
      console.log(res);
      this.uploadedDocumentDetails = res;
    });
  }

  onClickNext(acctId) {
    //console.log(acctId);
    this.router.navigate(['/review-information', acctId]);
  }

}

