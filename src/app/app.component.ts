import { Component } from "@angular/core";
import { Foto } from "./interfaces/foto";
import { FotoService } from "./services/foto.service";

@Component({
  selector: "app-root",
  template: `
    <div class="container mt-5">
      <p class="display-4 text-center">Liked Pictures: {{ likeds.length }}</p>
      <div class="row justify-content-evenly">
        <div class="card col-4 mb-5" style="width: 18rem" *ngFor="let photo of photos">
          <img src="{{ photo.url }}" class="card-img-top" alt="..." />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ photo.title }}</h5>
            <div class="align-self-end mt-auto mx-auto">
              <button (click)="delPhoto(photo.id)" type="button" class="btn btn-danger me-3">Delete</button>
              <button (click)="likePhoto(photo.id)" type="button" class="btn btn-success">Like</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class AppComponent {
  title = "es5";
  photos: Foto[] = [];
  likeds: Foto[] = [];
  error: string | undefined;

  constructor(private photosSrv: FotoService) {}

  ngOnInit(): void {
    this.fetchPhotos();
  }
  fetchPhotos() {
    // this.isLoading = true;
    this.photosSrv.fetchPhotos().subscribe(
      (resp) => {
        // this.isLoading = false;
        this.photos = resp.filter((photo) => photo.id < 200); // just to print less images, my PC was exploding with 5000 element
        console.log(resp);
      },
      (error) => {
        // this.isLoading = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }
  delPhoto(id: number) {
    this.photosSrv.deletePhoto(id).subscribe(() => {
      this.photos = this.photos.filter((photo) => photo.id != id);
      this.likeds = this.likeds.filter((liked) => liked.id != id);
    });
  }
  likePhoto(id: number) {
    if (!this.likeds.find((liked) => liked.id == id)) {
      this.likeds.push(this.photos.find((photo) => photo.id === id)!);
    } else {
      alert("You've already liked it");
    }
  }
}
