import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor {
    public options;
    public offline: boolean;

    constructor(private http: HttpClient) {}

    get(url: string, options?: any) {
      return this.intercept(this.http.get(url, options || this.options));
    }

    post(url: string, body, options?: any) {
        return this.intercept(this.http.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: any) {
        return this.intercept(this.http.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: any) {
        return this.intercept(this.http.delete(url, this.options));
    }

    getRequestOptionArgs(options?: any): any {
        if (options == null) { options = {}; }
        if (options.headers == null) {
            let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');
            options.headers = headers;
        }
        options.withCredentials = true;
        options.observe = 'body';
        options.responseType = 'json';
        return options;
    }

    intercept(observable: Observable<any>) {
        if (this.offline) { return of([]); }

        return observable.pipe(catchError((err: HttpErrorResponse , source) => {
          const errors: any = err.error || [];

          switch (err.status) {
            case 403:
                const response: Array<any> = err.error;
                const errorCode: string = response[0].code.toUpperCase();
                if (errorCode === 'FORBIDDEN') {
                    return throwError(err);
                } else if (errorCode === 'PASSWORD_CHANGE_NEEDED') {
                    return throwError('passwordChangeNeeded');
                } else {
                    return throwError('logout');
                }
            case 401:
                return throwError('logout');
            case 400: // Ошибка запроса, что то не прошло валидацию
                return throwError(errors);
            case 404: // Ошибка запроса, что то не прошло валидацию
                return throwError(err);
          }

          return throwError(errors);
      }));
  }
}
