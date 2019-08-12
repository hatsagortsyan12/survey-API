import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { ISurvey } from '@interfaces/.';

@Injectable({
	providedIn: 'root'
})
export class SurveyService {

	public surveys: Array<ISurvey> = [
		{
			id: 1,
			title: 'SMS',
			description: 'bla bla bla...',
			isDone: false
		},
		{
			id: 2,
			title: 'Email',
			description: 'bla bla bla...',
			isDone: false
		},
		{
			id: 3,
			title: 'Phone',
			description: 'bla bla bla...',
			isDone: false
		}
	];

	constructor() {
		if (!localStorage.getItem('surveys')) {
			localStorage.setItem('surveys', JSON.stringify(this.surveys));
		} else {
			this.surveys = JSON.parse(localStorage.getItem('surveys'));
		}
	}

	get(): Observable<ISurvey[]> {
		return of(this.surveys);
	}

	update(updateSurvey: ISurvey): Observable<ISurvey[]> {
		this.surveys.forEach(survey => {
			if (survey.id === updateSurvey.id) {
				survey = updateSurvey;
			}
		});
		localStorage.setItem('surveys', JSON.stringify(this.surveys));
		return of(this.surveys);
	}

}
