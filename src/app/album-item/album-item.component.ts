import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Album } from '../core/models/album';

@Component({
    selector: 'app-album-item',
    templateUrl: './album-item.component.html',
    styleUrls: ['./album-item.component.scss']
})
export class AlbumItemComponent implements OnInit {

    @Input() value: Album;

    @Output() addedFavorite = new EventEmitter<Album>();
    @Output() removedFavorite = new EventEmitter<Album>();

    constructor() { }

    ngOnInit() {
    }

}
