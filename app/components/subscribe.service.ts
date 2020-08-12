import { Injectable } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { CommonHttpRequest } from '../interface/getCommonHttpRequest';

import { HttpService } from '../http/http.service';
import { LoaderService } from "../loader/loader.service";
import { Subject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })

export class SubscribeService {

  constructor(private httpService: HttpService, private loaderService: LoaderService) {}

  ACTIONS = {
      COMMON: {
        createPost: (data) => { return this.httpService.createPost(data)},
        getLocations: () => { return this.httpService.getLocations()},
        checkDestroy: () => { return this.httpService.checkDestroy()},
        loadState: () => { return this.loaderService.loadState},
      },
    FakeComponent: {
      getFakePost: () => { return this.httpService.getFakePost()},
      createFakePost: (data) => { return this.httpService.createFakePost(data)},
      getJson: () => { return this.httpService.getJson()},
    }
  }

  commonSubscribe(request: CommonHttpRequest, destroyed$, type = 'COMMON') {
    this.ACTIONS[type][request.nameRequest](request.data)
      .pipe(takeUntil(destroyed$))
      .subscribe(
        res => { request.callback(res); },
        err => {
          request.errorFn
          ? request.callback(err)
          : console.log( `commonSubscribe - Ошибка - ${request.nameRequest} - `, err )
        }
    );
  }

  commonDestroy(destroyed$){
    destroyed$.next();
    destroyed$.complete();
  }

}
