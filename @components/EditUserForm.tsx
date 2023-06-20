'use client';
import Modal from '@/@components/Modal';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import classNames from 'classnames';

type Inputs = {
    name: string;
};
async function updateUser(id: number, data: Inputs) {
    const reqBody = {
        id,
        ...data,
    };
    return fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
            return err;
        });
}
const EditUserForm = ({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (data: Inputs) => updateUser(user.id, data),
        onSuccess: () => {
            toast.success('Successfully updated user');
            queryClient.invalidateQueries({
                queryKey: ['me'],
            });
        },
        onError: (error) => {
            console.log(error);
            toast.error('Something went wrong');
        },
    });
    const handleFormSubmit = (data: Inputs) => {
        mutate(data);
    };
    if (!user) return null;
    return (
        <Modal triggerTitle="Edit User" buttonClasses="btn btn-primary mt-4">
            <form
                onSubmit={handleSubmit((data) => {
                    handleFormSubmit(data);
                })}
                className={classNames({
                    'opacity-50': isLoading,
                    'flex flex-col h-full justify-between p-4 min-w-[20rem]':
                        true,
                })}
            >
                <label className="text-lg font-ubuntuBold" htmlFor="name">
                    Name
                </label>
                <input
                    className="py-2"
                    defaultValue={user.name || ''}
                    {...register('name')}
                />
                <button className="btn btn-primary mt-4" type="submit">
                    Submit
                </button>
            </form>
        </Modal>
    );
};

export default EditUserForm;
