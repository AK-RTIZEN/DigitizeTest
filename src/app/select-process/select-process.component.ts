import { Component, OnInit } from '@angular/core';

import { Process } from '../process.model';

import { SelectProcessService } from './select-process.service'

@Component({
  selector: 'app-select-process',
  templateUrl: './select-process.component.html',
  styleUrls: ['./select-process.component.css']
})
export class SelectProcessComponent implements OnInit {

  loadedProcess : Process[] = [];
  errorRes = null;

  constructor(private selectProcessService : SelectProcessService) { }

  ngOnInit() {
    this.selectProcessService.fetchProcess()
    .subscribe(
        process => {
          this.loadedProcess = process;
        },
        error => {
          this.errorRes = error.name;
          console.log(this.errorRes);
        }
      );


  }

}
