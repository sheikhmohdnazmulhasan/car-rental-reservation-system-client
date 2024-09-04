
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from 'react'
import Checkout from "./Checkout";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51OVWkVHfRFCfVZp8dwEwzuDWjUPgnMadf3sHxxb8mf3xzabCF3m5KEDKLHbGOafbOvQFi2NlokV0TBoWAqDaLDt500R0LHclLj');

const Payment = () => {
    const { bookingId } = useParams();

    return (
        <div className="h-screen">
            <>
                <Transition appear show={true} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => console.log('modal is closed')}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <div className="flex flex-col md:flex-row mt-10">
                                            <div className="lg:w-1/2">
                                                <h1 className="text-start text-xl flex items-center">RapidLink</h1>

                                                <div className="overflow-x-auto">
                                                    <p className="py-5 pr-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam blanditiis ratione quam laboriosam explicabo qui natus neque ex perferendis ab aut quae dolores nemo corrupti est dolorum nam eligendi, sapiente optio deserunt incidunt. Explicabo, neque.</p>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/2">
                                                <Elements stripe={stripePromise}>
                                                    <Checkout bookingId={bookingId} />
                                                </Elements>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        </div>
    );
};

export default Payment;
