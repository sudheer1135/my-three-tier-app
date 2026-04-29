import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Book {
  id?: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 700px; margin: 40px auto; font-family: Arial;">
      <h1>Book CRUD App</h1>

      <form (ngSubmit)="saveBook()" style="margin-bottom: 20px;">
        <input type="text" name="title" [(ngModel)]="book.title" placeholder="Book Title" required />
        <input type="text" name="author" [(ngModel)]="book.author" placeholder="Author" required />
        <button type="submit">{{ book.id ? 'Update' : 'Add' }} Book</button>
      </form>

      <table border="1" cellpadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let b of books">
            <td>{{ b.id }}</td>
            <td>{{ b.title }}</td>
            <td>{{ b.author }}</td>
            <td>
              <button (click)="editBook(b)">Edit</button>
              <button (click)="deleteBook(b.id!)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  book: Book = { title: '', author: '' };

  // IMPORTANT: use Docker service name
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.http.get<Book[]>(this.apiUrl).subscribe(data => {
      this.books = data;
    });
  }

  saveBook(): void {
    if (this.book.id) {
      this.http.put<Book>(`${this.apiUrl}/${this.book.id}`, this.book).subscribe(() => {
        this.resetForm();
        this.loadBooks();
      });
    } else {
      this.http.post<Book>(this.apiUrl, this.book).subscribe(() => {
        this.resetForm();
        this.loadBooks();
      });
    }
  }

  editBook(book: Book): void {
    this.book = { ...book };
  }

  deleteBook(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe(() => {
      this.loadBooks();
    });
  }

  resetForm(): void {
    this.book = { title: '', author: '' };
  }
}

