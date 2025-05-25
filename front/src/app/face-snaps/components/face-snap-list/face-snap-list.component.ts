import {Component, OnInit} from '@angular/core';
import {FaceSnap} from '../../../core/models/FaceSnap';
import {FaceSnapComponent} from '../face-snap/face-snap.component';
import {FaceSnapsService} from '../../../core/services/face-snaps.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnapComponent,
    AsyncPipe
  ],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})

export class FaceSnapListComponent implements OnInit {
  faceSnaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService) {
  }

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }
}
