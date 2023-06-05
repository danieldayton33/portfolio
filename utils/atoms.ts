import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const filterAtom = atom<string | ''>('');

export const chillPlaylistAtom = atomWithStorage<string | ''>(
    'chillPlayList',
    '',
);

export const hypePlayListAtom = atomWithStorage<string | ''>(
    'hypePlayList',
    '',
);

export const spotifyIframeApiAtom = atom<any>(null);
