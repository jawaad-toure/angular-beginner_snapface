import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';


@Component({
  selector: 'app-landing-page',
  imports: [
    FormsModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent implements OnInit {
  userEmail!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onContinue(): void {
    this.router.navigateByUrl('/facesnaps');
  }

  onSubmitForm(emailForm: NgForm): void {
    console.log(emailForm.value);
  }
}
