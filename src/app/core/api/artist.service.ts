import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
    constructor(
        private http: HttpClient
    ) { }

    getAll(params?: { }) {
        return this.http.get<Artist[]>(`${environment.apiUrl}/artists`, { params });
    }

    get(id: number) {
        return this.http.get<Artist>(`${environment.apiUrl}/artists/${id}`);
    }
}
