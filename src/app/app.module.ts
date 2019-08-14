import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SurveyComponent } from '@components/.';
import { SurveyService } from '@services/.';
import { SurveyProvider } from '@providers/.';

@NgModule({
	declarations: [
		AppComponent,
		SurveyComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		SurveyService,
		SurveyProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
