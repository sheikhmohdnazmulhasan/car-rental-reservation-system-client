import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen md:!pt-20 lg:py-0">
                    <h2 className="text-3xl mb-5">Rent<span className='text-rose-600'>NGo—</span></h2>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ex: Sheikh" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ex: name@example.com" required />
                                </div>
                                <div>
                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                    <input type="number" name="number" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Ex: 01700000000" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type={showPassword1 ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 relative rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                                    <p className="absolute hidden md:flex -mt-8 cursor-pointer curs ml-[350px]" onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type={showPassword2 ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 relative rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                                    <p className="absolute hidden md:flex -mt-8 cursor-pointer ml-[350px]" onClick={() => setShowPassword2(!showPassword2)}>
                                        {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">Accept our <Link to={'/'} className="text-rose-600 hover:underline">Terms & Conditions</Link></label>
                                        </div>
                                    </div>

                                </div>
                                <button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline">Sign in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;