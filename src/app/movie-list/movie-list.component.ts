import { Component, OnInit } from '@angular/core';

import { TMDBService } from '../services/tmdb.service';
import {Subscription} from 'rxjs';
import {IMovie} from '../model/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  private page = 1;
  topMovieSubscription: Subscription;
  topMovies: IMovie[] = [];

  constructor(private tmdbService: TMDBService) { }

  ngOnInit(): void {
    this.topMovieSubscription = this.tmdbService.topMoviesChange.subscribe(
      data => { this.topMovies = data }
    );
    this.tmdbService.getListOfMovies(this.page);
  }

  selectedMovie(selectedMovie: IMovie) {
    console.log(selectedMovie.id);
    this.tmdbService.getMovieDetaulByIDAndGetYoutubeLink(selectedMovie.id);
    let cvElement = document.getElementById('selectedMovie');
    let PhoneCvElement = document.getElementById('phoneSelectedMovie');
    cvElement.scrollIntoView();
    PhoneCvElement.scrollIntoView();
  }

  loadMore() {
    this.page = this.page + 1;
    this.tmdbService.getListOfMovies(this.page);
  }
}
