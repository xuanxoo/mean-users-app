import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { Message } from "../../types/message.interface";
import { MessageType } from "../../types/messageType.enum";

@Injectable()
export class AlertService {
  private subject = new Subject<Message>();

  constructor(private router: Router) {
    // clear alert message on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // clear mesage
        this.subject.next();
      }
    });
  }

  success(message: string) {
    this.subject.next({ type: MessageType.Success, text: message });
  }

  error(message: string) {
    this.subject.next({ type: MessageType.Error, text: message });
  }

  getMessage(): Observable<Message> {
    return this.subject.asObservable();
  }

}
