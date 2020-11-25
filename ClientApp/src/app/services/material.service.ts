import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Material } from '../models/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Materials/';
  }

  getMateriales(): Observable<Material[]> {
    return this.http.get<Material[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getMaterial(materialId: number): Observable<Material> {
      return this.http.get<Material>(this.myAppUrl + this.myApiUrl + materialId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveMaterial(material): Observable<Material> {
      return this.http.post<Material>(this.myAppUrl + this.myApiUrl, JSON.stringify(material), this.httpOptions)
      .pipe(
        retry(1), 
        catchError(this.errorHandler)
      );
  }

  updateMaterial(materialId: number, material): Observable<Material> {
      return this.http.put<Material>(this.myAppUrl + this.myApiUrl + materialId, JSON.stringify(material), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteMaterial(materialId: number): Observable<Material> {
      return this.http.delete<Material>(this.myAppUrl + this.myApiUrl + materialId)
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