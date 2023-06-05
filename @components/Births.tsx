'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { UserWithBirths } from '@/app/shiday/@births/page';
import classNames from 'classnames';

export async function getUserWithBirths(): Promise<UserWithBirths | null> {
    const res = await fetch('/api/user');
    return await res.json();
}
const Births = () => {
    const { data, isLoading } = useQuery(['me'], getUserWithBirths);
    if (!data) return <div>no user</div>;
    const { Births: births } = data;

    return (
        <div
            className={classNames({
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12': true,
                'opacity-50': isLoading,
            })}
        >
            <h2 className="lg:col-span-3 md:col-span-2 text-2xl font-ubuntuBold">
                Current Births
            </h2>
            {births &&
                births.map((birth) => {
                    const { id, title, date } = birth;
                    // prepare date
                    const dateObj = new Date(date);
                    return (
                        <div
                            key={id}
                            className="bg-amber-50 p-12 shadow-xl rounded-2xl grid"
                        >
                            <h2 className="text-3xl font-ubuntuBold mb-4">
                                {title}
                            </h2>
                            <p>{dateObj.toLocaleDateString()}</p>
                            <div className="flex mt-4">
                                <Link
                                    href={`/shiday/${id}`}
                                    className="btn btn-primary"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Births;
