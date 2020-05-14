import {Component, Input, OnInit} from '@angular/core';
import {TMDBService} from '../services/tmdb.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {IMovie} from '../model/movie.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  searchMovies: IMovie[] = [];
  movieForm: FormGroup;
  constructor(private fb: FormBuilder, private tmdbService: TMDBService) { }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      movieInput:['']
    });
    this.movieForm
      .get('movieInput')
      .valueChanges
      .pipe(
        debounceTime(1500),
        tap((value) => {console.log('Start Searching...', value)}),
        switchMap((value: string) => {
          if (value !== '')
             return this.tmdbService.getMovieDetails(value)
          else
             this.tmdbService.getListOfMovies(1);
        })).subscribe(result => {
        // @ts-ignore
      if(result) {
        this.searchMovies = result;
        this.tmdbService.topMoviesChange.next([...this.searchMovies]);
      }});

  }

}


/*  ngOnInit(): void {
    this.movieForm = this.fb.group({
      movieInput:['']
    });
    this.movieForm
      .get('movieInput')
      .valueChanges
      .pipe(
        debounceTime(1500),
        tap((value) => {console.log('Start Searching...', value)}),
        switchMap (value => this.tmdbService.getMovieDetails(value))).subscribe(result => {
          this.searchMovies = result;
          this.tmdbService.topMoviesChange.next([...this.searchMovies]);
    })
  }*/
