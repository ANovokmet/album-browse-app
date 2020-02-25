import { createAction, props } from '@ngrx/store';
import { Album } from 'src/app/core/models/album';

export const loadAlbums = createAction(
    '[Album] Load Albums',
    props<{ albums: Album[] }>()
);

export const updateSearch = createAction(
    '[Album] Search Albums',
    props<{ query: string }>()
);

export const addToFavorites = createAction(
    '[Album] Add to Favorites',
    props<{ id: number }>()
);

export const removeFromFavorites = createAction(
    '[Album] Remove from Favorites',
    props<{ id: number }>()
);

export const updateSuccess = createAction(
    '[Album] Update success',
    props<{ album: Album }>()
);

export const updateFailure = createAction(
    '[Album] Update success',
    props<{ error: any }>()
);


