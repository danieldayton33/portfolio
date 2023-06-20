'use client';
import { useAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { spotifyIframeApiAtom } from '@/utils/atoms';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PlayListIframe from '@/@components/PlayListIframe';
import { StyleSheetManager } from 'styled-components';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { BirthWithUser } from '@/app/shiday/@births/[id]/page';

const fetchSpotifyPlaylists = async (accessToken: string) => {
    const response = await fetch(
        'https://api.spotify.com/v1/me/playlists?limit=50',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return await response.json();
};

export const fetchBirth = async (id: string): Promise<BirthWithUser> => {
    const response = await fetch(`/api/birth?id=${id}`);
    return await response.json();
};
const PlayLists = () => {
    const params = useParams();
    const { data, isLoading } = useQuery(['birth', params.id], () =>
        fetchBirth(params.id),
    );
    const [playlists, setPlaylists] = useState<any[]>([
        { title: 'Hype Playlist', key: 'hypePlaylist', playlist: '' },
        {
            title: 'Chill Playlist',
            key: 'chillPlaylist',
            playlist: '',
        },
    ]);
    const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
    useEffect(() => {
        if (!data) return;
        const { hypePlaylist, chillPlaylist } = data;
        setPlaylists([
            {
                title: 'Hype Playlist',
                key: 'hypePlaylist',
                playlist: hypePlaylist,
            },
            {
                title: 'Chill Playlist',
                key: 'chillPlaylist',
                playlist: chillPlaylist,
            },
        ]);
    }, [data]);

    const [_, setIframeApi] = useAtom(spotifyIframeApiAtom);
    const [activePlaylist, setActivePlaylist] = useState<string | null>(
        playlists[0].title,
    );
    const session = useSession();
    useEffect(() => {
        if (session?.data?.user) {
            const accessToken = session.data.user?.accessToken;
            if (!accessToken) return;
            fetchSpotifyPlaylists(accessToken)
                .then((data) => {
                    setSpotifyPlaylists(data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [session]);

    useEffect(() => {
        window.onSpotifyIframeApiReady = (IframeAPI: any) => {
            setIframeApi(IframeAPI);
        };
    }, []);
    return (
        <StyleSheetManager>
            <div
                className={classNames({
                    'grid grid-cols-1 gap-12': true,
                    'opacity-50 pointer-events-none': isLoading,
                })}
            >
                <div>
                    <ToggleGroup.Root
                        type="single"
                        defaultValue={activePlaylist || ''}
                        onValueChange={(value) => {
                            setActivePlaylist(value);
                        }}
                        className="grid-cols-2 grid gap-8 max-w-4xl mx-auto"
                        id="iframeToggle"
                    >
                        {playlists.map((playlist) => (
                            <ToggleGroup.Item
                                key={playlist.title}
                                value={playlist.title}
                                className={classNames({
                                    'embed-toggle btn': true,
                                    'btn-secondary':
                                        activePlaylist === playlist.title,
                                })}
                                data-value={playlist.playlist}
                            >
                                {playlist.title}
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </div>
                <div className="min-h-[40rem] w-full relative">
                    {playlists.map((atom, i) => (
                        <PlayListIframe
                            title={atom.title}
                            key={`atom-${i}`}
                            objectKey={atom.key}
                            playlists={spotifyPlaylists}
                            playlist={atom.playlist}
                            isActive={activePlaylist === atom.title}
                        />
                    ))}
                </div>
            </div>
        </StyleSheetManager>
    );
};

export default PlayLists;
