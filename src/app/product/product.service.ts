import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //data
  // num = 10

  // message = "hello";

  // //logic / method
  // someMethod(){
  //   console.log('method of the service class')
  // }

  countSubject$ = new Subject<number>();
  constructor(private http: HttpClient) { }

  //this variable's value will be read by the navbar component
  updatedCartCount = 0;

  //this method will be called by the product-list component
  updateCartCount(){
    //++ will increment the value of the variable by 1
    this.updatedCartCount++;
    this.countSubject$.next(this.updatedCartCount);
  }

  /*
    read ==> get
    insert/add ==> post
    update ==> put
    delete ==> delete
  */

  //read all the products records
  readAll(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrl}/products`)
                    .pipe(catchError((error: HttpErrorResponse) => {
                        return throwError("Error occured while fetching the data.")
                    }));
  }

  //read one product record as per the id 
  readOne(id: number): Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`)
  }

  //extra setting for post and put functions
  //to specify that the data is in JSON format
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  insert(product: Product):Observable<Product>{
    return this.http.post<Product>(`${environment.apiUrl}/products`, 
                                    JSON.stringify(product),
                                    this.httpOption
    )
  }

  delete(id: number):Observable<Product>{
    return this.http.delete<Product>(`${environment.apiUrl}/products/${id}`);
  }

  update(id: number, product: Product):Observable<Product>{
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`,
                                    JSON.stringify(product),
                                    this.httpOption);
  }
}
