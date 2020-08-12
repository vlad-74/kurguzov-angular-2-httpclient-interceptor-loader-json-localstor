import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { SubscribeService } from '../subscribe.service';

type Post2 = { title: string, content: string };

@Component({
  selector: 'app-main',
  templateUrl: './fake.component.html',
})
export class FakeComponent implements OnInit, OnDestroy {
  name = 'FakeComponent'
  post: string;
  newPost: string;
  jsonGet: string;
  disabled = null;
  private readonly destroyed$ = new Subject();

  constructor( private subscribeService: SubscribeService ) {}

  ngOnInit() {
    let nameRequest = 'loadState'
    let callback = this.Resolve_getStates.bind(this)
    this.commonSubscribe({ nameRequest, callback })

    nameRequest = 'checkDestroy'
    callback = this.Resolve_checkDestroy.bind(this)
    this.commonSubscribe({ nameRequest, callback })
  }

  getJson() {
    this.jsonGet = "================Запрос данных==============";
    const nameRequest = 'getJson'
    const callback = this.Resolve_getJson.bind(this)
    this.commonSubscribe({ nameRequest, callback }, this.name)
  }
  
  getFakePost() {
    this.post = "================Запрос данных==============";
    const nameRequest = 'getFakePost'
    const callback = this.Resolve_getFakePost.bind(this)
    this.commonSubscribe({ nameRequest, callback }, this.name)
  }
  
  createFakePost() {
    this.newPost = "================Отправка данных==============";
    const data = {id: null, title: 'Yo mero' }
    const nameRequest = 'createFakePost'
    const callback = this.Resolve_createFakePost.bind(this)
    this.commonSubscribe({ nameRequest, callback,data }, this.name)
  }

  Resolve_getStates(data){ this.disabled = data; console.log('state', data); }
  Resolve_getJson(data) { this.jsonGet = "Данные получены"; console.log(data); }
  Resolve_getFakePost(data) {this.post = "Данные получены"; console.log(data); }
  Resolve_createFakePost(data) { this.newPost = "Пост - " + data.title; console.log(data); }
  Resolve_checkDestroy(data) {console.log('checkDestroy_FakeComponent',data); }


  commonSubscribe(data, name?: string){
    this.subscribeService.commonSubscribe(data, this.destroyed$, name)
  }

  ngOnDestroy() { this.subscribeService.commonDestroy(this.destroyed$) }
}
