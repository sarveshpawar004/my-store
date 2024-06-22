import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Here we are injecting the object of the ProductService class
  //the variables and the methods of this class will be accessiable 
  //using the variable ps
  // constructor(private ps: ProductService){
  //   console.log('product-list component');
  //   this.ps.someMethod();
  //   console.log(this.ps.message);
  // }


  constructor(private ps: ProductService){ }

  addToCart(){
    this.ps.updateCartCount();
  }

  //! is used to skip the initialization
  products!: Product[];
  errorMessage !: string;

  private _searchText = ''

  //this method will be called when we want to display the value
  //of the private variable
  get searchText():string{
    return this._searchText;
  }

  //this method will be called when we want to set the value 
  //of the private variable
  set searchText(value: string){
    this._searchText = value
    this.filterProducts(this._searchText)
  }

  //we will create a copy of the original products array
  copyOfProducts!: Product[];

  filterProducts(filterValue: string){
    this.copyOfProducts = this.products.filter(p => p.name.toLowerCase()
                                                    .includes(filterValue.toLowerCase()))
  }

  ngOnInit(): void {
      this.ps.readAll().subscribe({
        next: data => {
          this.products = data;
          this.copyOfProducts = this.products;
        },
        error: err => this.errorMessage = err
      })
  }
}
