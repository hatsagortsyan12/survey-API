import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SurveyComponent } from '@components/.';
import { SurveyService } from '@services/.';
import { SurveyProvider } from '@providers/.';
import { SurveyInterceptor } from '@interceptors/.';

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
		{ provide: HTTP_INTERCEPTORS, useClass: SurveyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: SurveyProvider, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
