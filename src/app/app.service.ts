import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Album } from './core/models/album';
import { updateSuccess, updateFailure } from './store/album/album.actions';
import { AlbumService } from './core/api/album.service';
import { State } from './store';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private store$: Store<State>,
        private albumService: AlbumService
    ) { }

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
