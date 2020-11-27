import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  myAppUrl: string;
  myApiUrl: string;
  myApiUrlCategorias: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Categorias/';
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getCategoria(categoriaId: number): Observable<Categoria> {
      return this.http.get<Categoria>(this.myAppUrl + this.myApiUrl + categoriaId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveCategoria(categoria): Observable<Categoria> {
      return this.http.post<Categoria>(this.myAppUrl + this.myApiUrl, JSON.stringify(categoria), this.httpOptions)
      .pipe(
        retry(1), 
        catchError(this.errorHandler)
      );
  }

  updateCategoria(categoriaId: number, categoria): Observable<Categoria> {
      return this.http.put<Categoria>(this.myAppUrl + this.myApiUrl + categoriaId, JSON.stringify(categoria), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteCategoria(categoriaId: number): Observable<Categoria> {
      return this.http.delete<Categoria>(this.myAppUrl + this.myApiUrl + categoriaId)
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
