import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintDocumentComponent } from './print-document/print-document.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectProcessComponent } from './select-process/select-process.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ReviewInformationComponent } from './review-information/review-information.component';

//const routes: Routes = [];

const appRoutes: Routes = [
  {path: '', component: LandingPageComponent },
  {path: 'select-process', component: SelectProcessComponent },
  {path: 'upload-document', component: UploadDocumentComponent },
  {path: 'review-information', component: ReviewInformationComponent },
  {path: 'print-document', component: PrintDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
