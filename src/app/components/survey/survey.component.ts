import { Component, OnInit } from '@angular/core';

import { ISurvey } from '@interfaces/.';
import { DataService } from '@services/.';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

	surveys: ISurvey[];

	constructor(private request: DataService) {
		request.get()
			.subscribe(res => {
				this.surveys = res;
			});
	}

	update(survey: ISurvey): void {
		this.request.update(survey)
			.subscribe(res => {
				this.surveys = res;
			});
	}

	ngOnInit() {
	}

}
