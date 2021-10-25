import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error.error || 'server')
  }

  constructor(private http: HttpClient) { }


  // Register API
  register(data): Observable<any> {
    let requestBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    }
    return this.http.post(`http://localhost:5000/register`, requestBody
    ).pipe(catchError(this.handleError))
  }


  // Login API
  login(data): Observable<any> {
    let requestBody = {
      email: data.email,
      password: data.password
    }
    return this.http.post(`http://localhost:5000/login`, requestBody
    ).pipe(catchError(this.handleError))
  }


   // getCuisines API
  getCuisines(): Observable<any> {
    return this.http.get(`http://localhost:5000/getCuisines` 
    ).pipe(catchError(this.handleError))
  }


   // getBrands API
   getBrands(): Observable<any> {
    let cuisine = JSON.parse(localStorage.getItem("cuisine"))
    return this.http.get(
      `http://localhost:5000/getBrands?cuisine=${cuisine}`
    ).pipe(catchError(this.handleError))
  }



   // getProducts API
   getProducts(): Observable<any> {
    let brand = JSON.parse(localStorage.getItem("brand"))
    return this.http.get(
      `http://localhost:5000/getProducts?brand=${brand}`
    ).pipe(catchError(this.handleError))
  }



   // createBrand API
   createBrand(data): Observable<any> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();

    headers = headers.set('auth-token', token)
    let requestBody = {
      brand: data.brandId,
      products: data.productsId
    }
    return this.http.post(`http://localhost:5000/createBrand`, requestBody, {headers: headers}
    ).pipe(catchError(this.handleError))
  }


  getAllBrands(): Observable<any> {
    let token = localStorage.getItem("token")
    let headers = new HttpHeaders();
    headers = headers.set('auth-token', token)
    return this.http.get(`http://localhost:5000/getAllBrands`, {headers: headers}
    ).pipe(catchError(this.handleError))
  }


  // viewBrand API
  viewBrand(userBrandId): Observable<any> {
    return this.http.get(
      `http://localhost:5000/viewBrand?userBrand=${userBrandId}`
    ).pipe(catchError(this.handleError))
  }


  // toggle brand
  public toggleBrand(data, userBrand) {
    let requestBody = {
      isActive: data.isActive,
    }
    return this.http.put(
      `http://localhost:5000/toggleBrand/?userBrandId=${userBrand}`, requestBody
    )
  }  


  // edit brand
  public editBrand(data, userBrandId) {
    let requestBody = {
      products: data.productsId,
    }
    return this.http.put(
      `http://localhost:5000/editBrand/?userBrand=${userBrandId}`, requestBody
    )
  }  
}
