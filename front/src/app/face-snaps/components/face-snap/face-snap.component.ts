import {Component, Input, OnInit} from '@angular/core';
import {FaceSnap} from '../../../core/models/FaceSnap';
import {UpperCasePipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-face-snap',
  imports: [
    UpperCasePipe,
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})

export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnap;

  constructor(private router: Router) {
  }

  onView(): void {
    this.router.navigateByUrl(`/facesnaps/${this.faceSnap.id}`)
  }
}
