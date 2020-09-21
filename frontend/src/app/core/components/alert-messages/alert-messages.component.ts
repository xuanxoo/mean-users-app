import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Message } from "../../types/message.interface";
import { AlertService } from "./alert-messages.service";

@Component({
  selector: "app-alert",
  templateUrl: "alert-messages.component.html"
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: Message;

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    // subscribe to alert messages to show it globally
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
