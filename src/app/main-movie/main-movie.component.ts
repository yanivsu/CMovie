import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { TMDBService } from '../services/tmdb.service';
import { IMovie } from '../model/movie.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main-movie',
  templateUrl: './main-movie.component.html',
  styleUrls: ['./main-movie.component.css']
})
export class MainMovieComponent implements OnInit, OnDestroy {
  movie: IMovie;
  movieSubscription: Subscription;
  imageLink = environment.imageLink;

  constructor(private tmdbService: TMDBService) { }

  ngOnInit() {
    this.movieSubscription = this.tmdbService.movieChange.subscribe(
      movies => (this.movie = movies)
    );
    // this.tmdbService.getMovieDetailsByID(181812);
    this.tmdbService.getMovieDetaulByIDAndGetYoutubeLink(181812);
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }

}
