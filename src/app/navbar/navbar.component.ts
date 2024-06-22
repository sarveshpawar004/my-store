import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount = 0

  // constructor(private ps:ProductService){
  //   console.log('navbar component');
  //   this.ps.someMethod();
  // }

  constructor(private ps: ProductService){}

  showCount(){
    
  }

  ngOnInit(): void {
    this.ps.countSubject$.subscribe(val => this.cartCount = val);
  }
}
