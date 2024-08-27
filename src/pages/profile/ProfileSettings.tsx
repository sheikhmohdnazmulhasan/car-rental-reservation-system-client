import React from 'react';
import Navbar from '../../components/root/Navbar';
import demoProfile from '../../../src/assets/demo-profile.jpg';
import { useGetFullUserQuery, usePatchUserMutation } from '../../redux/features/user/user.api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, useCurrentUser } from '../../redux/features/auth/auth.slice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import uploadImageToImgBb from '../../utils/uploadImageToImgBb';

const ProfileSettings: React.FC = () => {
    const user = useAppSelector(useCurrentUser);
    const { data: fullUser } = useGetFullUserQuery([{ email: user?.user }], { skip: !user });
    const [patchUser] = usePatchUserMutation();
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const toastId = toast.loading('Working...');
        if (event.target.files && event.target.files[0]) {

            const imgBbResponse = await uploadImageToImgBb(event.target.files[0]);

            if (imgBbResponse.success) {

                const serverResponse = await patchUser({
                    query: user?.user,
                    payload: {
                        photo: imgBbResponse.url
                    }
                });

                if (serverResponse.data?.success) {
                    toast.success('Profile Picture Updated 🫡', { id: toastId });

                } else {
                    toast.success('Oops! Something went wrong 🙁', { id: toastId });
                }
            }
        }
    };

    const handleChangeUserDetails: SubmitHandler<FieldValues> = async (data) => {
        const filteredObj = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== "")
        );

        if (Object.keys(filteredObj).length === 0) {
            console.log('no changes');
            return
        }

        const toastId = toast.loading('Working...');

        if (data.password) {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!passwordRegex.test(data.password)) {
                toast.error('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character. 🥱', { id: toastId })
                return

            } else if (data.password !== data.password2) {
                toast.error('Password did not match 😒', { id: toastId });
                return;

            } else {
                const hashPassword = await bcrypt.hash(data.password, 10);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password2, ...excludePassword2 } = filteredObj;
                const dataForBackend = { ...excludePassword2, password: hashPassword };

                const serverResponse = await patchUser({
                    query: user?.user,
                    payload: dataForBackend,
                });

                if (serverResponse.data?.success) {
                    toast.success('Profile Details Updated, Places Login again 😊', { id: toastId });
                    dispatch(logout());
                    navigate('/login');

                } else {
                    toast.success('Oops! Something went wrong 🙁', { id: toastId });
                }
            }

        } else {

            const serverResponse = await patchUser({
                query: user?.user,
                payload: filteredObj,
            });

            if (serverResponse.data?.success) {
                toast.success('Profile Details Updated 🫡', { id: toastId });

            } else {
                toast.success('Oops! Something went wrong 🙁', { id: toastId });
            }
        }
    }

    return (
        <div className="">
            <Navbar />
            <div className="max-w-full mt-5 md:mx-10 p-6 bg-white shadow-md rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column - User Data */}
                    <div>
                        <div className="flex flex-col items-start mb-4">
                            <div className="relative group">
                                <img
                                    src={fullUser?.data?.photo ? fullUser?.data?.photo : demoProfile}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full shadow-lg mb-4"
                                />
                                <label
                                    htmlFor="profile-picture"
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer mb-4 rounded-full border"
                                >
                                    <span className="text-white">Change</span>
                                </label>
                                <input
                                    id="profile-picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfilePictureChange}
                                />
                            </div>
                            <h1 className="text-2xl font-semibold">{fullUser?.data?.name}</h1>
                            <p className="text-gray-600">{fullUser?.data?.role === 'user' ? 'Customer' : 'Admin'}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Email: </span>
                                    {fullUser?.data?.email}
                                </p>
                                <p>
                                    <span className="font-medium">Phone: </span>
                                    {fullUser?.data?.phone}
                                </p>
                                <p>
                                    <span className="font-medium">Address: </span>
                                    {fullUser?.data?.address}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Account Details</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Joining At: </span>
                                    {new Date(fullUser?.data?.createdAt).toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium">Updated At: </span>
                                    {new Date(fullUser?.data?.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Edit Details Form */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
                        <form className="space-y-4" onSubmit={(handleSubmit(handleChangeUserDetails))}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        defaultValue={fullUser?.data?.name}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                        {...register('name')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        defaultValue={fullUser?.data?.email}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        defaultValue={fullUser?.data?.phone}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                        {...register('phone')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        type="text"
                                        defaultValue={fullUser?.data?.address}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                        {...register('address')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="new-password">
                                    New Password
                                </label>
                                <input
                                    id="new-password"
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                    {...register('password')}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="confirm-password">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-600"
                                    {...register('password2')}
                                />
                                <small className='ml-2'>If you change the password, you will need to login again</small>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
