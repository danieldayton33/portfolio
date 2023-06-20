'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const postContraction = async (birthId: number) => {
    const response = await fetch('/api/contraction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ birthId }),
    });
    return await response.json();
};
const AddContraction = ({
    birthId,
    contractionRunning,
}: {
    birthId: number;
    contractionRunning: boolean;
}) => {
    // Use the queryClient to invalidate the birth query
    const queryClient = useQueryClient();
    // Mutation for adding a new contraction
    const { mutate, isLoading } = useMutation({
        mutationFn: (birthId: number) => postContraction(birthId),
        onSuccess: (data) => {
            console.log(data);
            const { error } = data;
            if (error) {
                console.log(error);
                toast.error('Something went wrong');
                return;
            }
            // Show a success toast
            toast.success('Successfully added new contraction');
            // Invalidate the birth query
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
            // Show an error toast
            toast.error('Something went wrong');
            console.log(error);
        },
    });
    const addNewContraction = () => {
        mutate(birthId);
    };
    return (
        <>
            <button
                className={'btn btn-primary'}
                disabled={isLoading || contractionRunning}
                onClick={addNewContraction}
            >
                Add Contraction
            </button>
        </>
    );
};

export default AddContraction;
