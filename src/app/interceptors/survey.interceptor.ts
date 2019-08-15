import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SurveyInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = 'fake-jwt-token';

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});

		return next.handle(request);
	}

}

export const fakeBackendProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: SurveyInterceptor,
	multi: true
};
