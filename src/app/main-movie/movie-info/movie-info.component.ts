import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { IMovie } from '../../model/movie.model';
import { environment } from '../../../environments/environment';
import {TMDBService} from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit  {

  @Input() selectedMovie: IMovie;
  imageLink = environment.smallImageLink;
  showInfo = true;

  constructor(private tmdbService: TMDBService) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

}
