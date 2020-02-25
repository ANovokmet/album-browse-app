import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { State } from '../store';
import { selectQuery, selectAlbums } from '../store/album/album.selectors';
import { AlbumService } from '../core/api/album.service';
import { Album } from '../core/models/album';
import { updateSuccess, updateFailure, loadAlbums, updateSearch } from '../store/album/album.actions';
import { AppService } from '../app.service';

@Component({
    selector: 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

    albums$: Observable<Album[]>;
    searchControl = new FormControl('');

    constructor(
        private store$: Store<State>,
        private albumService: AlbumService,
        private appService: AppService
    ) {
        this.albums$ = this.store$.pipe(select(selectAlbums));

        this.store$.pipe(
            select(selectQuery),
            switchMap(query => this.albumService.getAll({ q: query })),
            map(response => loadAlbums({ albums: response }))
        ).subscribe(action => {
            this.store$.dispatch(action);
        });
    }

    onAddFavorite(album: Album) {
        this.appService.addFavorite(album);
    }

    onRemoveFavorite(album: Album) {
        this.appService.removeFavorite(album);
    }

    ngOnInit() {
    }

    trackByFn(album: Album) {
        return album.id;
    }

    onEnter() {
        this.store$.dispatch(updateSearch({query: this.searchControl.value }));
    }
}
