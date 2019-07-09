import { GenericBrowserDomAdapter } from '@angular/platform-browser/src/browser/generic_browser_adapter';

export interface Tmdb{
/*     adult: boolean,
    backdrop_path: string,
    belongs_to_collection: object,
    budget: number,
    genre: Array<Object>,
    homepage: string,
    id: number,
    imdb_id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number, */
    poster_path: string,
    backdrop_path: string,
    backdrops: Array<object>,
    file_path: string,
    object: object
}