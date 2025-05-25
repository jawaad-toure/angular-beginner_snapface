import { Injectable } from '@angular/core';
import {FaceSnap} from '../models/FaceSnap';
import {map, Observable, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FaceSnapsService {

  constructor(private http: HttpClient) {
  }

  private faceSnaps: FaceSnap[] = [];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId)
      .pipe(
        map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
        })),
        switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap)
        )
      );
  }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps()
      .pipe(
        map(faceSnaps => faceSnaps.sort((a, b) => (a.id - b.id))),
        map(faceSnapSorted => ({
            title: formValue.title,
            description: formValue.description,
            imageUrl: formValue.imageUrl,
            location: formValue.location,
            createdDate: new Date(),
            snaps: 0,
            id: faceSnapSorted[faceSnapSorted.length - 1].id + 1,
          })
        ),
        switchMap(previousFaceSnap => this.http.post<FaceSnap>(
          `http://localhost:3000/facesnaps`,
          previousFaceSnap
        ))
      );
  }

  deleteFaceSnap(faceSnapId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }
}
