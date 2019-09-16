import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PrintDocumentService } from './print-document.service';

import { Document } from '../document.model';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-print-document',
  templateUrl: './print-document.component.html',
  styleUrls: ['./print-document.component.css']
})
export class PrintDocumentComponent implements OnInit {

  loadedDocumentsDetails : Document[] = [];
  loadedCustomerDetails : Customer[] = [];
  uploadedDocumentDetails = [];
  errorRes1 = null;
  errorRes2 = null;
  

  constructor(private route : ActivatedRoute, private printDocumentService : PrintDocumentService, private router : Router) { }

  ngOnInit() {
    let acctId : string = this.route.snapshot.paramMap.get('acctId');
    //console.log(acctId);

    this.onLoadForms({acctId});
    this.onLoadFormsDetails({acctId});
  }

  onLoadForms(postData: {acctId : string}) {
    this.printDocumentService.loadForms(postData)
      .subscribe(
        documents => {
          //console.log(documents);
          this.loadedCustomerDetails = documents;
        },
        error => {
          this.errorRes1 = error.name;
        }
      );
  }

  onLoadFormsDetails(postData: {acctId : string}) {
    this.printDocumentService.loadFormsDetails(postData)
    .subscribe(
        documents => {
          //console.log(documents);
          this.loadedDocumentsDetails = documents;
        },
        error => {
          this.errorRes2 = error.name;
        }
      );
  }

  onClickBack(acctId) {
    //console.log(acctId);
    this.router.navigate(['/review-information', acctId]);
  }

}


