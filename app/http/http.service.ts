import { Injectable } from "@angular/core";
import { HttpInterceptor } from './httpInterceptor.service';
import { interval } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({ providedIn: "root" })

export class HttpService {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  readonly FAKE = 'https://my-json-server.typicode.com/typicode/demo';
  

  constructor(private http: HttpInterceptor) {}

  getLocations() { return this.http.get( this.ROOT_URL + '/todos' ); }

  createPost(data) { return this.http.post(this.ROOT_URL + '/posts', data ); }

  checkDestroy(){ return interval(2000) }

  getFakePost() { return this.http.get( this.FAKE + '/posts' ); }

  createFakePost(data) { return this.http.post(this.FAKE + '/posts', data ); }

  getJson() { return this.http.get('/assets/data.json', { responseType: "text" }) }

}
