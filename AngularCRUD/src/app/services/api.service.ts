import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any>(`${this.baseUrl}/allBooks`);
  }

  addBook(data: any) {
    return this.http.post<any>(`${this.baseUrl}/addBook`, data);
  }

  updateBook(bookId: any, data: any) {
    return this.http.put<any>(`${this.baseUrl}/updateBook/${bookId}`, data);
  }

  deleteBook(bookId: any) {
    return this.http.delete<any>(`${this.baseUrl}/deleteBook/${bookId}`);
  }
}

