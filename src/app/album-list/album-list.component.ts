import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { State } from '../store';
import { selectQuery, selectAlbums } from '../store/album/album.selectors';
import { AlbumService } from '../core/api/album.service';
import { Album } from '../core/models/album';
import { loadAlbums, updateSearch } from '../store/album/album.actions';
import { AppService } from '../app.service';

@Component({
    selector: 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {

    albums$: Observable<Album[]>;
    searchControl = new FormControl('');
    querySub: Subscription;
    serviceSub: Subscription;

    constructor(
        private store$: Store<State>,
        private albumService: AlbumService,
        private appService: AppService
    ) {
        this.albums$ = this.store$.pipe(select(selectAlbums));

        this.querySub = this.store$.pipe(select(selectQuery)).subscribe(query => {
            this.searchControl.setValue(query, {emitEvent: false});
        });

        this.serviceSub = this.store$.pipe(
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

    ngOnDestroy() {
        this.querySub.unsubscribe();
        this.serviceSub.unsubscribe();
    }
}
