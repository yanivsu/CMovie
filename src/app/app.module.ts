import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { MainMovieComponent } from './main-movie/main-movie.component';
import { TMDBService } from './services/tmdb.service';
import { SearchComponent } from './search/search.component';
import { MovieInfoComponent } from './main-movie/movie-info/movie-info.component';
import { MovieComponent } from './movie-list/movie/movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMovieComponent,
    SearchComponent,
    MovieInfoComponent,
    MovieComponent,
    MovieListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    YouTubePlayerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [TMDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }

