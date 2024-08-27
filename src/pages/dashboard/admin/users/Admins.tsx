import { useGetRoleBaseUsersQuery } from "../../../../redux/features/user/user.api";

const Admins = () => {
    const { data, isError, isLoading, isSuccess } = useGetRoleBaseUsersQuery([{ role: 'admin' }]);

    console.log({ data, isError, isLoading, isSuccess });
    return (
        <div className="">
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

                {/* Data Rows */}
                <div className="flex">
                    <div className="flex-1 py-2 px-4 border-b border-gray-300">John Doe</div>
                    <div className="flex-1 py-2 px-4 border-b border-gray-300">user@example.com</div>
                    <div className="flex-1 py-2 px-4 border-b border-gray-300">1234567890</div>
                    <div className="flex-1 py-2 px-4 border-b border-gray-300">admin</div>
                    <div className="flex-1 py-2 px-4 border-b border-gray-300">
                        <button className="border bg-gray-200 rounded-sm hover:bg-gray-300 transition-all hover:scale-105 py-1 px-2">Make Customer</button>
                    </div>
                </div>

                {/* Additional Data Rows */}
                {/* Add more rows as needed */}
                {/* <div className="flex">
        <div className="flex-1 py-2 px-4 border-b border-gray-300">Another Name</div>
        <div className="flex-1 py-2 px-4 border-b border-gray-300">another@example.com</div>
        <div className="flex-1 py-2 px-4 border-b border-gray-300">9876543210</div>
        <div className="flex-1 py-2 px-4 border-b border-gray-300">456 Another St, City, Country</div>
        <div className="flex-1 py-2 px-4 border-b border-gray-300">user</div>
      </div> */}
            </div>
        </div>
    );
};

export default Admins;