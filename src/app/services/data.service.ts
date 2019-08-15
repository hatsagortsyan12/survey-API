import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISurvey } from '@interfaces/.';

@Injectable({ providedIn: 'root' })
export class DataService {
	constructor(private http: HttpClient) { }

	get() {
		return this.http.get<ISurvey[]>(`http://localhost:4200/surveys`);
	}

	update(survey: ISurvey) {
		return this.http.put<ISurvey[]>(`http://localhost:4200/surveys`, survey);
	}
}
