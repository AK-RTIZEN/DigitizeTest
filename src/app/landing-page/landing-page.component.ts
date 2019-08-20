import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../customer.model';
import { LandingService } from './landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  loadedCustomers : Customer[] = [];
  recentCustomers : Customer[] = [];

  constructor(private router : Router, private landingService : LandingService ) { }

  ngOnInit() {
    this.landingService.recentApplicant()
    .subscribe(
        customers => {
          this.recentCustomers = customers;
        }
      );
  }

  searchApplicant(postData: { cstName : string }) {
    this.landingService.searchApplicant(postData)
    .subscribe(
        customers => {
        this.loadedCustomers = customers;
        }
    );
  }

  onClickCustomer(acctId : string) {
    this.router.navigate(['/upload-document', acctId]);
  }


  

}
