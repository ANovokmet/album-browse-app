import { Action, createReducer, on } from '@ngrx/store';

import * as AlbumActions from './album.actions';
import { Album } from 'src/app/core/models/album';

export const albumFeatureKey = 'album';

export interface State {
    albums: Album[];
    query: string;
}

export const initialState: State = {
    albums: [],
    query: ''
};

const albumReducer = createReducer(
    initialState,
    on(AlbumActions.loadAlbums, (state, action) => ({ ...state, albums: action.albums })),
    on(AlbumActions.updateSearch, (state, action) => ({ ...state, query: action.query })),
    on(AlbumActions.updateSuccess, (state, action) => ({ ...state, albums: updateAlbum(state.albums, action.album) }))
);

function updateAlbum(albums: Album[], album: Album) {
    return albums.map(item => (item.id === album.id) ? { ...item, ...album } : item);
}

export function reducer(state: State | undefined, action: Action) {
    return albumReducer(state, action);
}
