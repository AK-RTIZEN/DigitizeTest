import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

import { UploadDocumentService } from './upload-document.service';

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
  errorRes1 = null;
  errorRes2 = null;
  selectedFile : File = null;

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

  onFileSelected(event) {
    //console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(docName : string) {
    const fd = new FormData;
    fd.append('docType', docName);
    fd.append('payload', this.selectedFile, this.selectedFile.name);
    
    this.http.post('https://relmgr-dot-digitize.appspot.com/document/displayVerifiedImage', fd)
    .subscribe(res=>{
      console.log(res);
    });
  }

  onClickNext(acctId) {
    //console.log(acctId);
    this.router.navigate(['/review-information', acctId]);
  }

}
