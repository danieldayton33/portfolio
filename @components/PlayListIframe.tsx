'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { spotifyIframeApiAtom } from '@/utils/atoms';
import styled from 'styled-components';
import classNames from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const defaultPlayList = `spotify:playlist:37i9dQZF1DXcBWIGoYBM5M`;

async function updatePlayList(playlist: string, id: string, key: string) {
    const response = await fetch('/api/birth', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: parseInt(id),
            key: key,
            playlist: playlist,
        }),
    });
    return await response.json();
}
const PlayListIframe: FunctionComponent<{
    playlist?: string;
    title?: string;
    playlists?: any[];
    isActive: boolean;
    objectKey: string;
}> = ({ playlist, title = 'Playlist', playlists, isActive, objectKey }) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const [localPlaylist, _setPlaylist] = useState<string | undefined>(
        playlist,
    );
    const [isLoaded, setIsLoaded] = useState(false);
    const [iframeApi] = useAtom(spotifyIframeApiAtom);

    const { mutate, isLoading } = useMutation({
        mutationFn: (playlist: string) =>
            updatePlayList(playlist, params.id, objectKey),
        onError: (error) => {
            console.log(error);
            toast.error('Something went wrong');
        },
        onSuccess: (data) => {
            const { error } = data;
            if (error) {
                console.log(error);
                toast.error('Something went wrong');
                return;
            }
            toast.success('Successfully updated playlist');
            queryClient
                .invalidateQueries({
                    queryKey: ['birth', params.id],
                })
                .then(() => {
                    console.log('Invalidated birth query');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

    useEffect(() => {
        if (!localPlaylist) return;
        if (localPlaylist !== playlist) {
            mutate(localPlaylist);
        }
    }, [localPlaylist, playlist]);

    const activePlaylistRef = useRef<string | undefined>(playlist);
    // Create the ids for the iframe and select
    const iframeId = ` ${title.toLowerCase()}-iframe`;
    const selectId = ` ${title.toLowerCase()}-select`;
    // Setting a ref so that we can get the active playlist from the iframe in the callback
    const setPlaylist = (data: string) => {
        activePlaylistRef.current = data;
        _setPlaylist(data);
    };
    // Set the active playlist ref on first load to the playlist if it exists on load
    useEffect(() => {
        if (!playlist) return;
        if (!isLoaded) {
            activePlaylistRef.current = playlist;
            setIsLoaded(true);
        }
    }, [playlist, isLoaded]);
    // Create the iframe when the iframe api is loaded
    useEffect(() => {
        if (!iframeApi) return;
        const createIframe = (
            playList: string,
            IframeAPI: any,
            el: HTMLElement,
        ) => {
            const options = {
                uri: `${playList || defaultPlayList}`,
            };
            const callback = (EmbedController: any) => {
                const select = document.getElementById(selectId);
                if (!select) return;
                // Switch the playlist when the select changes
                select.addEventListener('change', (e) => {
                    const target = e.target as HTMLSelectElement;
                    EmbedController.loadUri(target.value);
                });
                // get the toggles and check if the value matches the playlist if so play it,  if it does not pause
                const toggles = document.querySelectorAll('.embed-toggle');
                toggles.forEach((toggle) => {
                    toggle.addEventListener('click', (e) => {
                        const target = e.target as HTMLButtonElement;
                        const value = target.dataset.value;
                        if (activePlaylistRef.current !== value) {
                            return EmbedController.pause();
                        }
                        setTimeout(() => {
                            EmbedController.resume();
                        }, 1000);
                    });
                });
            };
            IframeAPI.createController(el, options, callback);
        };
        const el = document.getElementById(iframeId);
        if (el && playlist) createIframe(playlist, iframeApi, el);
    }, [playlist, iframeApi, iframeId, selectId]);

    return (
        <StyledPlaylistIframeDiv
            className={classNames({
                'max-w-7xl w-7/12 mx-auto': true,
                active: isActive,
            })}
        >
            <form
                className={classNames({
                    'flex flex-col': true,
                    'opacity-50 pointer-events-none': isLoading,
                })}
            >
                <label className="text-3xl font-ubuntuBold" htmlFor={selectId}>
                    {title}
                </label>
                <select
                    id={selectId}
                    name={title}
                    value={playlist || ''}
                    onChange={(e) => setPlaylist(e.currentTarget.value)}
                    className="p-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:outline-none my-4"
                >
                    <option value="">Select a playlist</option>
                    {playlists?.map((playlist) => (
                        <option key={playlist.id} value={playlist.uri}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
            </form>

            <div id={iframeId} />
        </StyledPlaylistIframeDiv>
    );
};

const StyledPlaylistIframeDiv = styled.div`
    position: absolute;
    transform: translateX(-200%);
    transition: transform 0.5s ease-in-out;
    left: 0;
    right: 0;
    margin: 0 auto;
    &.active {
        transform: translateX(0);
    }
`;
export default PlayListIframe;
