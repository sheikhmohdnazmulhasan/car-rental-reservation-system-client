import React from "react";
import { TFullUser } from "../../../../interface/user.interface";

const UsersCard: React.FC<TFullUser> = ({ _id, email, name, phone, role }) => {

    async function handleChangeUserRole() {
        console.log(_id);
    }

    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{name}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{email}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{phone}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{role}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">
                    <button onClick={handleChangeUserRole} className="border bg-gray-200 rounded-sm hover:bg-gray-300 transition-all hover:scale-105 py-1 px-2">{role === 'admin' ? 'Make Customer' : 'Make Admin'}</button>
                </div>
            </div>
        </div>
    );
};

export default UsersCard;