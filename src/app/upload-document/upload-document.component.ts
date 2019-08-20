import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private uploadDocumentService : UploadDocumentService, private route : ActivatedRoute) { }

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
        }
      );
  }

  onloadDocumentsDetails(postData: {acctId : string}) {
    this.uploadDocumentService.loadDocumentDetails(postData)
    .subscribe(
        documents => {
          this.loadedDocumentsDetails = documents;
        }
      );
  }

}
