import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { TraktService } from 'src/app/trakt.service';
import { TmdbService } from 'src/app/tmdb.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  constructor(private route : ActivatedRoute, private traktService: TraktService, private tmdbService: TmdbService) { }
tmdbId: string
season: number | string
traktId: number | string
episodeNumber : number | string
detailstrakt
detailsTmdb
posterUrl : string
  ngOnInit() {
    this.getEpisode()
  }
  getEpisode(){
    this.route.parent.paramMap.subscribe((params: ParamMap) => { 
      //retrieve and observe parents route params

        this.tmdbId = params.get('id');
          console.log(this.tmdbId)
        this.season= params.get('number');
        console.log(this.season)
        this.traktId = params.get('trakt')

        this.route.paramMap.subscribe((params: ParamMap) =>{

            this.episodeNumber = params.get('episodenumber')
            console.log(this.episodeNumber)
            this.traktService.getSeason(this.traktId, `seasons/${this.season}/episodes/${this.episodeNumber}?extended=full`).subscribe(
              res => {
                      this.detailstrakt = res.body
                      console.log(this.detailstrakt)
              })
          let options= `${this.season}/episode/${this.episodeNumber}`
          this.tmdbService.getSeason(this.tmdbId, options).subscribe(
            res => {
                this.detailsTmdb = res
                console.log(this.detailsTmdb)
                this.posterUrl= `${this.tmdbService.config.images.base_url}w300${this.detailsTmdb.still_path}`})
               }
               )
    })
  
}
}
