import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { Album } from './core/models/album';
import { updateSuccess, updateFailure, loadAlbums, updateSearch } from './store/album/album.actions';
import { AlbumService } from './core/api/album.service';
import { State } from './store';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private store$: Store<State>,
        private albumService: AlbumService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.pipe(
            map(params => params['q']),
            filter(query => !!query),
            map(query => updateSearch({ query }))
        ).subscribe(action => {
            this.store$.dispatch(action);
        });
    }

    addFavorite(album: Album) {
        this.albumService.update(album.id, { favorite: true }).pipe(
            map(response => updateSuccess({ album: response })),
            catchError(error => of(updateFailure({ error })))
        ).subscribe(action => {
            this.store$.dispatch(action);
        });
    }

    removeFavorite(album: Album) {
        this.albumService.update(album.id, { favorite: false }).pipe(
            map(response => updateSuccess({ album: response })),
            catchError(error => of(updateFailure({ error })))
        ).subscribe(action => {
            this.store$.dispatch(action);
        });
    }
}
