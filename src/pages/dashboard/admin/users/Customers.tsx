
import UsersCard from "../../../../components/dashboard/admin/users/UsersCard";
import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { TFullUser } from "../../../../interface/user.interface";
import { useGetRoleBaseUsersQuery } from "../../../../redux/features/user/user.api";

const Customers = () => {
    const { data, isError, isLoading } = useGetRoleBaseUsersQuery([{ role: 'user' }]);

    if (isLoading) return <LoadingSpinier />
    if (isError) return <FetchErrorElmt />

    return (
        <div data-aos='fade-left' className="">
            <h1 className="text-2xl font-semibold mb-5">Admins</h1>
            <div className="flex flex-col w-full  mx-auto">
                {/* Column Headers */}
                <div className="flex bg-gray-200 text-gray-700 font-semibold">
                    <div className="flex-1 py-2 px-4">Name</div>
                    <div className="flex-1 py-2 px-4">Email</div>
                    <div className="flex-1 py-2 px-4">Phone</div>
                    <div className="flex-1 py-2 px-4">Role</div>
                    <div className="flex-1 py-2 px-4">Action</div>
                </div>

                {data?.data?.map((user: TFullUser, indx: number) => <UsersCard key={indx} {...user} />)}
            </div>
        </div>
    );
};

export default Customers;