import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

const routes: Routes = [
    {
        path: '',
        component: AlbumListComponent
    },
    {
        path: 'artist/:id',
        component: ArtistDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
