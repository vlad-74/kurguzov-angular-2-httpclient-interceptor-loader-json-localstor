import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../../interface/post';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  locations: string;
  newPost: string;
  disabled = null;
  private readonly destroyed$ = new Subject();

  constructor( private subscribeService: SubscribeService) {}

  ngOnInit() {
    let nameRequest = 'loadState'
    let callback = this.Resolve_getStates.bind(this)
    this.commonSubscribe({ nameRequest, callback })
 
    nameRequest = 'checkDestroy'
    callback = this.Resolve_checkDestroy.bind(this)
    this.commonSubscribe({ nameRequest, callback })

    console.log('localStorage.locations - ', localStorage.getItem('locations')  || 'данных нет');
  }

  getLocations() {
    this.locations = "================Запрос данных==============";
    const nameRequest = 'getLocations'
    const callback = this.Resolve_getLocations.bind(this)
    this.commonSubscribe({ nameRequest, callback })
  }

  createPost() {
    this.newPost = "================Отправка данных==============";
    const data: Post = {id: null, userId: 23, title: 'Yo mero', body: 'Una descripcion muy larga' }
    const nameRequest = 'createPost'
    const callback = this.Resolve_createPost.bind(this)
    this.commonSubscribe({ nameRequest, callback, data })
  }

  Resolve_getStates(data){ this.disabled = data; console.log('state', data); }

  Resolve_getLocations(data) { this.locations = "Данные получены"; console.log(data); }

  Resolve_createPost(data) { this.newPost = "Пост - " + data.body; console.log(data); }

  Resolve_checkDestroy(data) {console.log('checkDestroy_MainComponent',data); }


  commonSubscribe(data){ this.subscribeService.commonSubscribe(data, this.destroyed$) }

  ngOnDestroy() { this.subscribeService.commonDestroy(this.destroyed$)}
}
