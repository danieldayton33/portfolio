'use client';

import { FunctionComponent, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
    name: string;
    email: string;
    message: string;
};

// Resolver for react hook form to make TS happy
const resolver: Resolver<FormValues> = async (values) => {
    const { name, email, message } = values;
    if (name && email && message) {
        return {
            values: values,
            errors: {},
        };
    } else if (!name) {
        return {
            values: values.name ? values : {},
            errors: !values.name
                ? { name: { type: 'required', message: 'Name is required' } }
                : {},
        };
    } else if (!email) {
        return {
            values: values.email ? values : {},
            errors: !values.email
                ? { email: { type: 'required', message: 'Email is required' } }
                : {},
        };
    } else if (!message) {
        return {
            values: values.message ? values : {},
            errors: !values.message
                ? {
                      message: {
                          type: 'required',
                          message: 'Message is required',
                      },
                  }
                : {},
        };
    }
    return {
        values: values.email ? values : {},
        errors: !values.email
            ? { email: { type: 'required', message: 'Email is required' } }
            : {},
    };
};

const Contact: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({ resolver });
    const handleFormSubmit = async (data: FormValues) => {
        console.log(data);
        setIsLoading(true);
        await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 200) {
                    setMessage('Message sent!');
                    reset();
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                } else {
                    setMessage('Something went wrong');
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setMessage('Something went wrong');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
                setIsLoading(false);
            });
    };
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <h3 className="text-6xl mt-12 font-ubuntuBold">Contact</h3>
            {
                // Show message if there is one
                message ? (
                    <div>{message}</div>
                ) : (
                    <div className="w-full max-w-xs">
                        <form
                            className="flex flex-col justify-center"
                            onSubmit={handleSubmit((data) =>
                                handleFormSubmit(data),
                            )}
                        >
                            <div className="flex flex-col mb-4">
                                <label
                                    className="font-ubuntuBold"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="px-3 rounded shadow bg-slate-50 py-2 focus:outline-primary"
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                />
                                {errors?.name && (
                                    <div>{errors.name.message}</div>
                                )}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    className="font-ubuntuBold"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="px-3 rounded shadow py-2 focus:outline-primary"
                                    {...register('email')}
                                    type="email"
                                    id="email"
                                />
                                {errors?.email && (
                                    <div>{errors.email.message}</div>
                                )}
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    className="font-ubuntuBold"
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    className="shadow px-3 rounded bg-slate-50 py-2 focus:outline-primary"
                                    {...register('message')}
                                    id="message"
                                    rows={4}
                                />
                                {errors?.message && (
                                    <div>{errors.message.message}</div>
                                )}
                            </div>
                            <button className="btn" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Contact;
