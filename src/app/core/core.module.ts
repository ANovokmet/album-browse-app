import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from './api/album.service';
import { ArtistService } from './api/artist.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AlbumService,
        ArtistService
    ]
})
export class CoreModule { }
