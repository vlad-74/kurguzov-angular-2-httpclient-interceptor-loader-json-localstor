import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
})
export class LocalComponent implements OnInit, OnDestroy {
  locations: string;
  disabled = null;
  private readonly destroyed$ = new Subject();

  constructor(private subscribeService: SubscribeService) {}

  ngOnInit() {
    let nameRequest = 'loadState'
    let callback = this.Resolve_getStates.bind(this)
    this.commonSubscribe({ nameRequest, callback })

    if(!localStorage.getItem('locations').length){
      this.locations = "================Запрос данных==============";
      const nameRequest = 'getLocations'
      const callback = this.Resolve_getLocations.bind(this)
      this.commonSubscribe({ nameRequest, callback })
    }

    nameRequest = 'checkDestroy'
    callback =  this.Resolve_checkDestroy.bind(this)
    this.commonSubscribe({ nameRequest, callback })
  }
  
  getLocations() {
    this.locations = "================Запрос данных==============";
    const nameRequest = 'getLocations'
    const callback = this.Resolve_getLocations.bind(this)
    this.commonSubscribe({ nameRequest, callback })
  }

  getLocationsForLocalStorage(){
    this.locations = 'Данные ролучены получены из LocalStorage';
    console.log(JSON.parse(localStorage.getItem('locations')));
  }

  Resolve_getStates(data){ this.disabled = data; console.log('state', data); }

  Resolve_getLocations(data) {
    localStorage.setItem('locations', JSON.stringify(data));
    this.locations = "Данные в LocalStorage";
  }

  Resolve_checkDestroy(data) {console.log('checkDestroy_LocalComponent',data); }
  
  
  commonSubscribe(data){ this.subscribeService.commonSubscribe(data, this.destroyed$) }

  ngOnDestroy() {
    localStorage.setItem('locations', '')
    this.subscribeService.commonDestroy(this.destroyed$)
  }
}
