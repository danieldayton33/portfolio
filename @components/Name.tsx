'use client';
import { useQuery } from '@tanstack/react-query';
import { getUserWithBirths } from '@/@components/Births';
import EditUserForm from '@/@components/EditUserForm';

const Name = () => {
    const { data, isLoading } = useQuery(['me'], getUserWithBirths);
    return (
        <div className={isLoading ? 'opacity-50' : ''}>
            <h1 className="text-5xl font-ubuntuBold">
                Hello {data?.name || data?.email}
            </h1>
            {data && <EditUserForm user={data} />}
        </div>
    );
};
export default Name;
