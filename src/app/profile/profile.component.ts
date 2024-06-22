import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{
  age = 0
  name = 'No name'

  // subscription$ !: Subscription;

  myObservable$ !: Observable<any>

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.myObservable$ = this.route.queryParams

      // this.subscription$ = this.route.queryParams.subscribe(params => {
      //                             this.name = params['name']
      //                             this.age = params['age']
      // })
  }

  //we have to unsubscribe from the observable before leaving this component
  //unsubscribing is necessary as in angular when we subscribe to an observable the subscription will run indefinitely 
  ngOnDestroy(): void {
      // this.subscription$.unsubscribe();
  }
}
