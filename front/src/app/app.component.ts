import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaceSnapListComponent} from './face-snap-list/face-snap-list.component';
import {HeaderComponent} from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {


  ngOnInit() {

  }
}
