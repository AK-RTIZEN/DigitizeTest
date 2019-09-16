import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ReviewInformationService } from './review-information.service';

import { Document } from '../document.model';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-review-information',
  templateUrl: './review-information.component.html',
  styleUrls: ['./review-information.component.css']
})
export class ReviewInformationComponent implements OnInit {

  loadedDocumentsDetails : Document[] = [];
  loadedCustomerDetails : Customer[] = [];
  errorRes1 = null;
  errorRes2 = null;

  constructor(private route : ActivatedRoute, private reviewInformationService : ReviewInformationService, private router : Router ) { }

  ngOnInit() {
    let acctId : string = this.route.snapshot.paramMap.get('acctId');
    //console.log(acctId);

    this.onloadDocuments({acctId});
    this.onloadDocumentsDetails({acctId});
  }

  onloadDocuments(postData: {acctId : string}) {
    this.reviewInformationService.loadDocuments(postData)
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

  onloadDocumentsDetails(postData: {acctId : string}) {
    this.reviewInformationService.loadDocumentDetails(postData)
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

  onClickNext(acctId) {
    //console.log(acctId);
    this.router.navigate(['/print-document', acctId]);
  }

  onClickBack(acctId) {
    //console.log(acctId);
    this.router.navigate(['/upload-document', acctId]);
  }

}
