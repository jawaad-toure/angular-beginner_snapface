import {Component, OnInit} from '@angular/core';
import {FaceSnap} from '../../../core/models/FaceSnap';
import {CommonModule, DatePipe, NgClass, NgStyle, UpperCasePipe} from '@angular/common';
import {FaceSnapsService} from '../../../core/services/face-snaps.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  imports: [
    CommonModule,
    NgStyle,
    NgClass,
    UpperCasePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})

export class SingleFaceSnapComponent implements OnInit {
  buttonText!: string;
  faceSnap$!: Observable<FaceSnap>;
  faceSnap!: FaceSnap;


  constructor(
    private faceSnapsService: FaceSnapsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = +this.activatedRoute.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap')
        .pipe(
          tap(() => this.buttonText = 'Oops, unSnap!')
        );
    } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap')
        .pipe(
          tap(() => this.buttonText = 'Oh Snap!')
        );
    }
  }

  onDelete(faceSnapId: number): void {
    this.faceSnapsService.deleteFaceSnap(faceSnapId)
      .pipe(
        tap(() => this.router.navigateByUrl('/facesnaps'))
      )
      .subscribe();
  }
}
