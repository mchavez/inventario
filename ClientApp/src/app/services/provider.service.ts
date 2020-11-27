import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Proveedors/';
  }

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getProveedor(proveedorId: number): Observable<Proveedor> {
      return this.http.get<Proveedor>(this.myAppUrl + this.myApiUrl + proveedorId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveProveedor(proveedor): Observable<Proveedor> {
      return this.http.post<Proveedor>(this.myAppUrl + this.myApiUrl, JSON.stringify(proveedor), this.httpOptions)
      .pipe(
        retry(1), 
        catchError(this.errorHandler)
      );
  }

  updateProveedor(proveedorId: number, proveedor): Observable<Proveedor> {
      return this.http.put<Proveedor>(this.myAppUrl + this.myApiUrl + proveedorId, JSON.stringify(proveedor), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteProveedor(proveedorId: number): Observable<Proveedor> {
      return this.http.delete<Proveedor>(this.myAppUrl + this.myApiUrl + proveedorId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
