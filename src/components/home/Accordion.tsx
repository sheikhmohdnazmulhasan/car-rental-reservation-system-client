

const Accordion = () => {
    return (
        <section className="bg-white pt-8">
            <div className="relative mx-auto max-w-5xl text-center">
                <span className="text-rose-600 flex items-center justify-center font-medium uppercase tracking-wider">
                    FAQ
                </span>
                <h2
                    className="block w-full font-bold text-3xl sm:text-4xl text-gray-700">
                    Frequently Asked Questions
                </h2>
                <p
                    className="mx-auto my-4 w-full max-w-xl  text-center text-gray-400">
                    Have questions about our car rental services? We've got you covered! Below, you'll find answers to some of the most common queries from our customers.
                </p>
            </div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                {/* <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900"></h2> */}
                <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
                    <div>

                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                                <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                What is the process for renting a car?
                            </h3>
                            <p className="text-gray-500">Renting a car is simple! Just browse our selection of vehicles, choose your desired car, and complete the booking process online. Once confirmed, you can pick up the car at the specified location or opt for delivery if available.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                                <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                What documents are required to rent a car?
                            </h3>
                            <p className="text-gray-500">You'll need a valid driver's license, a credit card for the deposit, and proof of identity, such as a passport or national ID. Additional documents may be required depending on local regulations.</p>

                        </div>

                    </div>
                    <div>
                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                                <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                Are there any mileage limits on rentals?
                            </h3>
                            <p className="text-gray-500">Some of our vehicles come with mileage limits, while others offer unlimited mileage. The specific terms will be clearly stated during the booking process. Be sure to check your rental agreement for details.</p>
                        </div>
                        <div className="mb-10">
                            <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900">
                                <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                Can I modify or cancel my booking?
                            </h3>
                            <p className="text-gray-500">Yes, you can modify or cancel your booking, but please note that changes or cancellations may be subject to fees depending on the timing and terms of your reservation. Review our cancellation policy or contact customer support for assistance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accordion;