import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAlbum from './album/album.reducer';

export interface State {
    [fromAlbum.albumFeatureKey]: fromAlbum.State;
}

export const reducers: ActionReducerMap<State> = {
    album: fromAlbum.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
