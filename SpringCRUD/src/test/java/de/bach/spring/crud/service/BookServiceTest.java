package de.bach.spring.crud.service;

import de.bach.spring.crud.model.Book;
import de.bach.spring.crud.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Test
    void shouldReturnAllBooks() {
        BookRepository bookRepository = Mockito.mock(BookRepository.class);
        BookService bookService = new BookService(bookRepository);

        Book book1 = new Book("Spring Boot", "John");
        Book book2 = new Book("DevOps", "Sudheer");

        when(bookRepository.findAll()).thenReturn(Arrays.asList(book1, book2));

        assertThat(bookService.getAllBooks()).hasSize(2);
        verify(bookRepository, times(1)).findAll();
    }

    @Test
    void shouldAddBook() {
        BookRepository bookRepository = Mockito.mock(BookRepository.class);
        BookService bookService = new BookService(bookRepository);

        Book book = new Book("Docker", "Alex");

        when(bookRepository.save(book)).thenReturn(book);

        Book savedBook = bookService.addBook(book);

        assertThat(savedBook.getTitle()).isEqualTo("Docker");
        assertThat(savedBook.getAuthor()).isEqualTo("Alex");
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void shouldUpdateBook() {
        BookRepository bookRepository = Mockito.mock(BookRepository.class);
        BookService bookService = new BookService(bookRepository);

        Book existingBook = new Book("Old Title", "Old Author");
        existingBook.setId(1L);

        Book updatedBook = new Book("New Title", "New Author");

        when(bookRepository.findById(1L)).thenReturn(Optional.of(existingBook));
        when(bookRepository.save(existingBook)).thenReturn(existingBook);

        Book result = bookService.updateBook(1L, updatedBook);

        assertThat(result.getTitle()).isEqualTo("New Title");
        assertThat(result.getAuthor()).isEqualTo("New Author");
        verify(bookRepository, times(1)).findById(1L);
        verify(bookRepository, times(1)).save(existingBook);
    }

    @Test
    void shouldDeleteBook() {
        BookRepository bookRepository = Mockito.mock(BookRepository.class);
        BookService bookService = new BookService(bookRepository);

        bookService.deleteBook(1L);

        verify(bookRepository, times(1)).deleteById(1L);
    }
}
