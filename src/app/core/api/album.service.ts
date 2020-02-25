import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Album } from '../models/album';


@Injectable()
export class AlbumService {
    constructor(
        private http: HttpClient
    ) { }

    getHttpParams(params?: {}) {
        const defaultParams = {
            _expand: 'artist'
        };

        return {
            ...defaultParams,
            ...params
        };
    }

    getAll(params?: {}) {
        return this.http.get<Album[]>(`${environment.apiUrl}/albums`, { params: this.getHttpParams(params) });
    }

    get(id: number) {
        return this.http.get<Album>(`${environment.apiUrl}/albums/${id}`, { params: this.getHttpParams() });
    }

    getByArtist(artistId: number) {
        return this.http.get<Album[]>(`${environment.apiUrl}/albums/`, { params: this.getHttpParams({ artistId }) });
    }

    update(id: number, body: Partial<Album>) {
        return this.http.patch<Album>(`${environment.apiUrl}/albums/${id}`, body, { params: this.getHttpParams() });
    }
}
