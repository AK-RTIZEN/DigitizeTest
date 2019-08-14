import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SelectProcessComponent } from './select-process/select-process.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ReviewInformationComponent } from './review-information/review-information.component';
import { PrintDocumentComponent } from './print-document/print-document.component';





@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SelectProcessComponent,
    UploadDocumentComponent,
    ReviewInformationComponent,
    PrintDocumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
