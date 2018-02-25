import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalSubscribeService {
  public subject: Subject<any> = new Subject<any>();

  constructor() {
  }

  public get getSubscribe(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * 发送消息，
   * 目前有2个消息：'contractile menu' 收起菜单消息，
   *              'extend menu'     展开菜单
   * @memberof GlobalSubscribeService
   */
  public sendMessage(info) {
    this.subject.next(info);
  }
}
