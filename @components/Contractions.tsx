'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import { Contraction } from '@prisma/client';
import AddContraction from '@/@components/AddContraction';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBirth } from '@/@components/Playlists';
import { X } from 'react-feather';
import toast from 'react-hot-toast';
import classNames from 'classnames';

async function updateContraction(contraction: Contraction) {
    const response = await fetch('/api/contraction', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contraction),
    });
    return await response.json();
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}min ${seconds}s`;
};

const Contraction: FunctionComponent<{
    contraction: Contraction;
    deleteContraction: (id: number) => void;
    index: number;
}> = ({ contraction, deleteContraction, index }) => {
    const { length, notes, song } = contraction;
    const [isRunning, setIsRunning] = useState(contraction.isRunning);
    const [contractionState, setContractionState] =
        useState<Contraction>(contraction);
    const [time, setTime] = useState(0);
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: () => updateContraction(contractionState),
        onSuccess: () => {
            toast('Successfully updated contraction');
            queryClient
                .invalidateQueries({
                    queryKey: ['birth', contractionState.birthId.toString()],
                })
                .then(() => {
                    console.log('Invalidated birth query');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onError: (error) => {
            toast.error('Something went wrong');
            console.log(error);
        },
    });
    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);
    const handleStop = () => {
        setIsRunning(false);
        setContractionState((contractionState) => ({
            ...contractionState,
            isRunning: false,
            length: time,
            endTime: new Date(),
        }));
        mutate();
    };
    return (
        <div
            className={classNames({
                'bg-gray-100': isRunning,
                'bg-white': !isRunning,
                'opacity-50': isLoading,
                'grid grid-cols-4 gap-4 p-4 rounded-md shadow-md': true,
            })}
        >
            <p>{index}</p>
            <p>{length > 0 ? formatTime(length) : formatTime(time)}</p>
            <button onClick={handleStop}>Stop</button>
            <button onClick={() => deleteContraction(contraction.id)}>
                <X />
            </button>
        </div>
    );
};

async function deleteContractionDb(id: number) {
    const response = await fetch(`/api/contraction?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

const Contractions: FunctionComponent<{
    contractions: Contraction[];
    birthId: number;
}> = ({ birthId }) => {
    const [anyContractionRunning, setAnyContractionRunning] = useState(false);
    // State for time since last contraction
    const [sinceLastContraction, setSinceLastContraction] = useState(0);
    const queryClient = useQueryClient();
    // Fetch the birth with contractions
    const { data, isLoading } = useQuery(['birth', birthId.toString()], () =>
        fetchBirth(birthId.toString()),
    );
    useEffect(() => {
        if (data) {
            const { contractions } = data;
            if (contractions) {
                const contractionRunning = contractions.find(
                    (contraction) => contraction.isRunning,
                );
                setAnyContractionRunning(!!contractionRunning);
            }
        }
    }, [data]);
    // Mutation for deleting a contraction
    const { mutate, isLoading: isMutating } = useMutation({
        mutationFn: (id: number) => deleteContractionDb(id),
        onSuccess: (data) => {
            const { error } = data;
            if (error) {
                console.log(error);
                toast.error('Something went wrong');
                return;
            }
            toast.success('Successfully deleted contraction');
            queryClient
                .invalidateQueries({
                    queryKey: ['birth', birthId.toString()],
                })
                .then(() => {
                    console.log('Invalidated birth query');
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onError: (error) => {
            toast.error('Something went wrong');
            console.log(error);
        },
    });
    // Handler for deleting a contraction
    const deleteContraction = (id: number) => {
        mutate(id);
    };
    const { contractions } = data || {};
    // update the time since last contraction every second
    useEffect(() => {
        // if there are no contractions, return
        if (!contractions || contractions.length === 0) return;
        // if there is a contraction running, set the time since last contraction to 0 and return
        if (anyContractionRunning) return setSinceLastContraction(0);
        // get the most recent contraction
        const mostRecentContraction = contractions.reduce((prev, current) => {
            return prev.startTime > current.startTime ? prev : current;
        });
        // get the time since the most recent contraction
        const timeSinceLastContraction = Math.floor(
            (new Date().getTime() -
                new Date(mostRecentContraction.startTime).getTime()) /
                1000,
        );
        // set the time since the most recent contraction and update every second
        setSinceLastContraction(timeSinceLastContraction);
        const interval = setInterval(() => {
            setSinceLastContraction(timeSinceLastContraction + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [contractions, anyContractionRunning]);
    return (
        <div
            className={classNames({
                'container mx-auto': true,
                'opacity-50 pointer-none': isLoading || isMutating,
            })}
        >
            <div className="grid my-4">
                {sinceLastContraction > 0 && (
                    <div className="bg-gray-100 p-4 rounded-md shadow-md">
                        <p>
                            Time since last contraction:{' '}
                            {formatTime(sinceLastContraction)}
                        </p>
                    </div>
                )}
                <AddContraction
                    birthId={birthId}
                    contractionRunning={anyContractionRunning}
                />
                {contractions &&
                    contractions.map((contraction, i) => {
                        return (
                            <Contraction
                                contraction={contraction}
                                deleteContraction={deleteContraction}
                                key={contraction.id}
                                index={i + 1}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Contractions;
