import Footer from '../../components/root/Footer';
import Navbar from '../../components/root/Navbar';

const Recover = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex justify-center px-5 items-center -mt-20">
                <div className="h-96 w-full md:w-[40%] mx-auto shadow-md rounded-md">
                    <div className="flex justify-center h-full px-5 md:px-10 flex-col">
                        <div className="mb-10">
                            <h1 className='text-3xl font-semibold text-gray-700'>Recover Your Account</h1>
                            <p className='text-gray-700'>Sorry to hear that you have forgotten your account information, but no problem, we will help you recover it.</p>

                        </div>
                        <form className='flex items-center'>
                            <input
                                id="Enter Email Address"
                                type="email"
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2 border border-rose-600 rounded-l-md focus:outline-none focus:ring-0"
                            />
                            <button className='py-2 px-3 border border-rose-600 bg-rose-600 text-white rounded-r-md'>Search</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Recover;