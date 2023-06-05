'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import toast from 'react-hot-toast';

export type BirthInputs = {
    title: string;
    date: Date;
};

async function addNewBirth(data: BirthInputs) {
    const response = await fetch('/api/birth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

const BirthForm = () => {
    const [isAdding, setIsAdding] = useState(false);
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: BirthInputs) => addNewBirth(data),
        onSuccess: () => {
            setIsAdding(false);
            toast.success('Successfully added new birth');
            reset();
        },
        onError: (error) => {
            toast.error('Something went wrong');
            console.log(error);
            reset();
        },
    });

    const onSubmit: SubmitHandler<BirthInputs> = (data) => {
        mutate(data);
    };
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BirthInputs>();
    return (
        <div>
            <button
                className={'btn btn-primary'}
                onClick={() => setIsAdding(true)}
            >
                Add New
            </button>
            {isAdding && (
                <div
                    className={classNames({
                        'p-8 max-w-2xl bg-secondary shadow-b-2xl my-8 rounded-xl relative':
                            true,
                        'bg-50': isLoading,
                    })}
                >
                    <button
                        className="absolute top-2 right-2 "
                        onClick={() => setIsAdding(false)}
                    >
                        X
                    </button>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid gap-4"
                    >
                        <label
                            className="font-ubuntuBold text-xl"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input
                            className="p-2 rounded"
                            type="text"
                            {...register('title', {
                                required: true,
                            })}
                        />
                        {errors.title && <span>This field is required</span>}
                        <label
                            className="font-ubuntuBold text-xl"
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <input
                            className="p-2 rounded"
                            type="date"
                            {...register('date', {
                                required: true,
                            })}
                        />
                        {errors.date && <span>This field is required</span>}
                        <input type="submit" className="btn btn-secondary" />
                    </form>
                </div>
            )}
        </div>
    );
};

export default BirthForm;
