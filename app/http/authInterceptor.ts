import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private auth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authHeader = this.auth.getToken();
    const authHeader = 'Bearer 1A2b3C4d5E6f7G8h9IAgBKClD';

    const authReq = req.clone({ headers: req.headers.set( 'Authorization', authHeader ) });
    console.log('authReq - ', authReq);
    return next.handle(authReq);
  }
}