import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { SurveyService } from '@services/.';
import { ISurvey } from '@interfaces/.';

@Injectable()
export class SurveyProvider implements HttpInterceptor {

	constructor(private surveys: SurveyService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, headers, body } = request;

		// wrap in delayed observable to simulate server api call
		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize())
			.pipe(delay(500))
			.pipe(dematerialize());

		function handleRoute() {
			switch (true) {
				case url.endsWith('/surveys') && method === 'POST':
					return update();
				case url.endsWith('/surveys') && method === 'GET':
					return get();
				default:
					return next.handle(request);
			}
		}


		function update() {
			if (!isLoggedIn()) {
				return unauthorized();
			}
			const survey: ISurvey = body;
			this.surveys.update(survey);
			return ok();
		}

		// function authenticate() {
		// 	const { username, password } = body;
		// 	const user = users.find(x => x.username === username && x.password === password);
		// 	if (!user) {
		// 		return error('Username or password is incorrect');
		// 	} else {
		// 		return ok({
		// 			id: user.id,
		// 			username: user.username,
		// 			firstName: user.firstName,
		// 			lastName: user.lastName,
		// 			token: 'fake-jwt-token'
		// 		});
		// 	}
		// }

		function get() {
			if (!isLoggedIn()) {
				return unauthorized();
			}
			return ok(this.survey.get());
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
