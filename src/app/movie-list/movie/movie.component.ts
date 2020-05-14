import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../model/movie.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: IMovie;
  imageLink = environment.smallImageLink;

  constructor() { }

  ngOnInit(): void {
  }

}
