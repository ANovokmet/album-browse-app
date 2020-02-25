import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlbum from './album.reducer';

export const selectAlbumState = createFeatureSelector<fromAlbum.State>(
    fromAlbum.albumFeatureKey
);

export const selectAlbums = createSelector(selectAlbumState, state => state.albums);
export const selectQuery = createSelector(selectAlbumState, state => state.query);
