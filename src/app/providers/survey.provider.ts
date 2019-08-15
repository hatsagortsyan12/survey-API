import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { SurveyService } from '@services/.';
import { ISurvey } from '@interfaces/.';

@Injectable()
export class SurveyProvider implements HttpInterceptor {

	constructor(private surveyService: SurveyService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, headers, body } = request;

		const that = this;

		if (!isLoggedIn()) {
			return unauthorized();
		}

		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize())
			.pipe(delay(500))
			.pipe(dematerialize());

		function handleRoute() {
			switch (true) {
				case url.endsWith('/surveys') && method === 'PUT':
					return update();
				case url.endsWith('/surveys') && method === 'GET':
					return get();
				default:
					return next.handle(request);
			}
		}


		function update() {
			const survey: ISurvey = body;
			return ok(that.surveyService.update(survey));
		}

		function get() {
			return ok(that.surveyService.get());
		}

		function ok(body?) {
			return of(new HttpResponse({ status: 200, body }));
		}

		function unauthorized() {
			return throwError({ status: 401, error: { message: 'Unauthorized' } });
		}

		function error(message) {
			return throwError({ error: { message } });
		}

		function isLoggedIn() {
			return headers.get('Authorization') === 'Bearer fake-jwt-token';
		}
	}

}

export const fakeBackendProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: SurveyProvider,
	multi: true
};
