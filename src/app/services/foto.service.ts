import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, throwError } from "rxjs";
// import { catchError, map, Subject, throwError } from 'rxjs';
import { Foto } from "../interfaces/foto";

@Injectable({
  providedIn: "root",
})
export class FotoService {
  sub = new Subject<number>();

  constructor(private http: HttpClient) {}

  fetchPhotos() {
    return this.http.get<Foto[]>("https://jsonplaceholder.typicode.com/photos").pipe(
      // error management
      catchError((err) => {
        return throwError(this.getErrorMess(err.status));
      })
    );
  }

  deletePhoto(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/photos/${id}`).pipe(
      // error management
      catchError((err) => {
        return throwError(this.getErrorMess(err.status));
      })
    );
  }

  // error messages
  private getErrorMess(status: number) {
    let mess = "";
    switch (status) {
      case 404:
        mess = "Resources not found";
        break;
      case 500:
        mess = "Internal Server Error";
        break;
      default:
        mess = "Something went wrong...";
        break;
    }
    return mess;
  }
}
