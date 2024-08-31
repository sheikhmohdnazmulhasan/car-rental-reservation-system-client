import React from 'react';

const WhyChooseUs: React.FC = () => {
    return (
        <div className="">

            <section id="features"
                className="relative block px-6 py-10 md:py-20 md:px-10">

                <div className="relative mx-auto max-w-5xl text-center">
                    <span className="text-rose-600 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
                        Why choose us
                    </span>
                    <h2
                        className="block w-full font-bold text-3xl sm:text-4xl text-gray-700">
                        Your Perfect Drive Awaits
                    </h2>
                    <p
                        className="mx-auto my-4 w-full max-w-xl  text-center text-gray-400">
                        At RentNGo, we go beyond just providing cars—we deliver a premium experience tailored to your needs.
                    </p>
                </div>

                <div className="relative mx-auto max-w-7xl grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-md hover:scale-105 transition-all border border-gray-200 bg-gray-100 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border ">
                            <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                        <h3 className="mt-6 text-gray-700 font-semibold">Best Prices Guaranteed</h3>
                        <p className="my-4 mb-0  text-gray-700">We offer the most competitive rates in the market, ensuring you get the best value for your money every time you rent with us.
                        </p>
                    </div>

                    <div className="rounded-md hover:scale-105 transition-all border border-gray-200 bg-gray-100 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border ">
                            <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>

                        </div>
                        <h3 className="mt-6 text-gray-700 font-semibold">24/7 Customer Support</h3>
                        <p className="my-4 mb-0  text-gray-700">
                            We're here for you around the clock, providing dedicated assistance whenever you need it, making your rental experience hassle-free.
                        </p>
                    </div>

                    <div className="rounded-md hover:scale-105 transition-all border border-gray-200 bg-gray-100 p-8 text-center shadow">
                        <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border ">
                            <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                            </svg>

                        </div>
                        <h3 className="mt-6 text-gray-700 font-semibold">Wide Selection of Vehicles</h3>
                        <p className="my-4 mb-0  text-gray-700">
                            From luxury cars to rugged SUVs, our extensive fleet ensures you find the perfect ride to match your style and needs.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;