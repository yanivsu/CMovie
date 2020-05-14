import { Injectable } from '@angular/core';
import {forkJoin, Observable, pipe, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IMovie } from '../model/movie.model';
import {concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class TMDBService {

    private apiKey = environment.apiKey;
    private getMovieByIDLink = 'https://api.themoviedb.org/3/movie/';
    private movieDetailLink = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&language=en-US&';
    private popularMoviesLink = 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=en-US&page=';
    private getVideoKey = environment.getVideoKey;
    private movie: IMovie ;
    private topMovies: IMovie[] = [];

    movieChange = new Subject<IMovie>();
    topMoviesChange = new Subject<IMovie[]>();

    constructor(private httpService: HttpClient) { }

    getMovieDetailsByID(id: number) {
      let tempMovie = this.getMovieByIDLink + id.toString() + '?api_key=' + this.apiKey + '&language=en-US'
      this.httpService.get(tempMovie)
        .pipe(
          map(data => {
            // @ts-ignore
              let tempMovie: IMovie = {
                id: data['id'],
                name: data['title'],
                description: data['overview'],
                date: data['release_date'],
                rating: data['vote_average'],
                posterImage: data['poster_path'],
                smallImage: data['backdrop_path'],
                budget: data['budget'],
                income: data['revenue']
              }
              return tempMovie;
          })
        ).subscribe((movie: IMovie) => {
        this.movie = movie;
        console.log(this.movie);
        this.movieChange.next({...this.movie} as IMovie);
      });
    }

    getMovieDetaulByIDAndGetYoutubeLink(id: number) {
      let tempMovieLink = this.getMovieByIDLink + id.toString() + '?api_key=' + this.apiKey + '&language=en-US'
      this.httpService.get(tempMovieLink)
        .pipe(
          switchMap(data => {
            let tempMovie: IMovie = {
              id: data['id'],
              name: data['title'],
              description: data['overview'],
              date: data['release_date'],
              rating: data['vote_average'],
              posterImage: data['poster_path'],
              smallImage: data['backdrop_path'],
              budget: data['budget'],
              income: data['revenue']
            }
            let newLink = environment.getVideoKey + tempMovie.id + '/videos?api_key=' + this.apiKey + '&language=en-US';
            return this.httpService.get(newLink)
              .pipe(
                // @ts-ignore
                map(res => {
                  // @ts-ignore
                  tempMovie.youtube =  res.results[0]['key'];
                  return ({...tempMovie});
                })
              )
          })
        ).subscribe((res: IMovie) => {
        this.movie = res;
       // console.log(this.movie);
        this.movieChange.next({...this.movie} as IMovie);
      });
    }

   /* getMovieDetails(movieName: string) {
      let tempMovieLint = this.movieDetailLink + 'query='+ movieName + '&page=1&include_adult=false';
      this.httpService.get(tempMovieLint)
        .pipe(
          map(data => {
            // @ts-ignore
            return data.results.map(movie => {
              let tempMovie: IMovie = {
                id: movie['id'],
                name: movie['title'],
                description: movie['overview'],
                date: movie['release_date'],
                rating: movie['vote_average'],
                posterImage: movie['poster_path'],
                smallImage: movie['backdrop_path']
              }
              console.log('After Map', tempMovie);
              return tempMovie;
            })
          })
        ).subscribe((movies: IMovie) => {
          this.movie = movies;
          console.log(this.movie);
          // @ts-ignore
        this.movieChange.next([...this.movie]);
      });
    }
*/
  getMovieDetails(movieName: string) {
   let tempMovieLint = this.movieDetailLink + 'query='+ movieName + '&page=1&include_adult=false';
   console.log(tempMovieLint);
   return this.httpService.get(tempMovieLint)
     .pipe(
       map(data => {
         // @ts-ignore
         return data.results.map(movie => {
           let tempMovie: IMovie = {
             id: movie['id'],
             name: movie['title'],
             description: movie['overview'],
             date: movie['release_date'],
             rating: movie['vote_average'],
             posterImage: movie['poster_path'],
             smallImage: movie['backdrop_path']
           }
           return tempMovie;
         })
       })
     )
 }

    getListOfMovies(page: number) {
      console.log(page.toString());
      let tempLink = this.popularMoviesLink + page.toString();
      this.httpService.get(tempLink)
        .pipe(
          map(data => {
            // @ts-ignore
            return data.results.map(movie => {
              const tempMovie: IMovie = {
                id: movie['id'],
                name: movie['title'],
                description: movie['overview'],
                date: movie['release_date'],
                rating: movie['vote_average'],
                posterImage: movie['poster_path'],
                smallImage: movie['backdrop_path']
              }
              return tempMovie;
            })
          })
        ).subscribe((movies: IMovie[]) => {
        if(this.topMovies.length > 1) {
          movies.forEach(movie => {
            this.topMovies.push(movie);
          })
          this.topMoviesChange.next([...this.topMovies]);
        } else {
          this.topMovies = movies;
          this.topMoviesChange.next([...this.topMovies]);
        }
      });
    }

}
