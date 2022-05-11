import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { catchError, map, Subject, throwError } from 'rxjs';
import { Foto } from '../interfaces/foto';

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  // error = new Subject();

  constructor(private http: HttpClient) {}

  fetchPhotos() {
    return this.http.get<Foto[]>('https://jsonplaceholder.typicode.com/photos');
  }
  deletePhoto(id: number) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
  }
}
