
import React, { useEffect, useState } from 'react';
import Footer from '../../components/root/Footer';
import Navbar from '../../components/root/Navbar';
import axios from 'axios';
import demoProfile from '../../assets/demo-profile.jpg';

interface TAxiosResponse {
    name: string;
    email: string;
    photo: string
    token: string
}

const WRONG_EMAIL_LIMIT = 3;
const LOCK_TIME = 1 * 60 * 1000;

const Recover = () => {
    const [user, setUser] = useState<TAxiosResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [failedAttempts, setFailedAttempts] = useState<number>(0);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [lockTime, setLockTime] = useState<Date | null>(null);

    console.log(lockTime?.toLocaleTimeString());

    const handleFindUser = async (event: React.FocusEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError(null);
        const email = event.target.email.value;

        try {
            const res = await axios.get<{ success: boolean; data: TAxiosResponse }>(`http://localhost:5000/api/auth/user/recovery`, {
                params: {
                    email
                }
            });
            if (res?.data?.success) {
                setFailedAttempts(0);
                setUser((res.data?.data as TAxiosResponse));

            } else {
                const newFailedAttempts = failedAttempts + 1;
                setFailedAttempts(newFailedAttempts);

                const remainingAttempts = WRONG_EMAIL_LIMIT - newFailedAttempts;

                if (newFailedAttempts >= WRONG_EMAIL_LIMIT) {
                    const lockUntil = new Date(Date.now() + LOCK_TIME);
                    setIsLocked(true);
                    setLockTime(lockUntil);
                    localStorage.setItem('lockTime', lockUntil.toString());
                    setError(`Bro! Too many failed attempts. Session restricted for 15 minutes.`)
                } else {
                    setError(`Invalid email. You have ${remainingAttempts} attempt(s) left.`);
                }
            }
        } catch (error) {
            setError('Something went Wrong');
            console.log(error);
        }
    }

    useEffect(() => {
        const savedLockTime = localStorage.getItem('lockTime');
        if (savedLockTime) {
            const timeLeft = new Date(savedLockTime).getTime() - Date.now();
            if (timeLeft > 0) {
                setError('Bro! Too many failed attempts. Session restricted for 15 minutes.')
                setIsLocked(true);
                setLockTime(new Date(savedLockTime));
                setTimeout(() => {
                    setIsLocked(false);
                    setLockTime(null);
                    localStorage.removeItem('lockTime');
                }, timeLeft);
            }
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex justify-center px-5 items-center -mt-5 md:-mt-20">
                <div className={`md:h-96 ${user ? 'md:flex' : 'block'} justify-between w-full md:w-[${user ? '80%' : '40%'}] mx-auto py-16 md:py-0 shadow-md rounded-md`}>
                    {/* search */}
                    <div className="flex flex-1 justify-center h-full px-5 md:px-10 flex-col">
                        <div className="mb-10">
                            <h1 className='text-3xl font-semibold text-gray-700'>Recover Your Account</h1>
                            <p className='text-gray-700'>Sorry to hear that you have forgotten your account information, but no problem, we will help you recover it.</p>

                        </div>
                        <form className={`${user ? 'hidden' : 'flex'} items-center`} onSubmit={handleFindUser}>
                            <input
                                disabled={isLocked}
                                name='email'
                                id="Enter Email Address"
                                type="email"
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2 border border-rose-600 rounded-l-md focus:outline-none focus:ring-0"
                                required
                            />
                            <button type={isLocked ? 'button' : 'submit'} className='py-2 px-3 border hover:bg-rose-700 transition-all border-rose-600 bg-rose-600 text-white rounded-r-md'>Search</button>
                        </form>
                        <p className='text-sm text-rose-600 ml-1'>{error}</p>
                    </div>

                    {/* profile details */}
                    {user && <div className="flex-1 border-t md:border-t-0">
                        <p className='text-end p-5 text-xl font-semibold cursor-pointer' onClick={() => setUser(null)}>x</p>
                        <div className=" flex flex-col mt-2 justify-center px-5 md:px-10 items-center border-l">
                            {/* name and photo */}
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src={user?.photo ? user?.photo : demoProfile}
                                    alt="Profile photo"
                                    className="w-24 h-24 rounded-full shadow-lg mb-4"
                                />
                                <h3 className='text-xl text-gray-700'>{user?.name}</h3>
                                <small>{user?.email}</small>

                            </div>
                            <div className="mt-7">
                                <button className='py-2 px-3 rounded-md hover:bg-rose-700 transition-all bg-rose-600 text-white'>Send Verification Code To Email</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Recover;