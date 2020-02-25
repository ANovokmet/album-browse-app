import { Artist } from './artist';

export interface Album {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
    releaseDate: string;
    artistId: number;
    favorite: boolean;
    artist: Artist;
}
