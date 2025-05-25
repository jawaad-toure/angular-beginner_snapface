import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FaceSnap} from '../../../core/models/FaceSnap';
import {map, Observable, tap} from 'rxjs';
import {FaceSnapsService} from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-new-face-snap',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})

export class NewFaceSnapComponent implements OnInit {
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  imageUrlRegEx!: RegExp;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private faceSnapsService: FaceSnapsService
  ) {
  }

  ngOnInit(): void {
    this.snapForm = this.formBuilder.group(
      {
        title: [null, Validators.required],
        description: [null, Validators.required],
        imageUrl: [null, [Validators.required, Validators.pattern(this.imageUrlRegEx)]],
        location: [null]
      },
      { updateOn : 'blur'}
    );

    this.faceSnapPreview$ = this.snapForm.valueChanges
      .pipe(
        map((snapFace) => ({
          ...snapFace,
          createdDate: new Date(),
          snaps: 0,
          id: 0
        }))
      );
  }

  onSubmitForm(): void {
    this.faceSnapsService.addFaceSnap(this.snapForm.value)
      .pipe(
        tap(() => this.router.navigateByUrl('/facesnaps'))
      )
      .subscribe();
  }
}
