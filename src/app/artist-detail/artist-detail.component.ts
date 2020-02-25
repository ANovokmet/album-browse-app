import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Album } from '../core/models/album';
import { AlbumService } from '../core/api/album.service';
import { State } from '../store';
import { Artist } from '../core/models/artist';
import { ArtistService } from '../core/api/artist.service';
import { selectAlbums } from '../store/album/album.selectors';
import { loadAlbums } from '../store/album/album.actions';
import { AppService } from '../app.service';

@Component({
    selector: 'app-artist-detail',
    templateUrl: './artist-detail.component.html',
    styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {

    artist$: Observable<Artist>;
    albums$: Observable<Album[]>;

    constructor(
        private store$: Store<State>,
        private albumService: AlbumService,
        private artistService: ArtistService,
        private route: ActivatedRoute,
        private appService: AppService
    ) {
        const id$ = this.route.params.pipe(take(1), map(params => params.id));

        this.artist$ = id$.pipe(switchMap(id => this.artistService.get(id)));
        this.albums$ = this.store$.pipe(select(selectAlbums));

        id$.pipe(
            switchMap(id => this.albumService.getByArtist(id)),
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

}
