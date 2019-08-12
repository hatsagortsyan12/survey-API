import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SurveyComponent } from '@components/.';
import { SurveyService } from '@services/.';

@NgModule({
	declarations: [
		AppComponent,
		SurveyComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [SurveyService],
	bootstrap: [AppComponent]
})
export class AppModule { }
