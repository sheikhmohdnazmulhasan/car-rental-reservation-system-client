
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from 'react'
import Checkout from "./Checkout";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout, useCurrentToken, useCurrentUser } from "../../../redux/features/auth/auth.slice";
import { TBookingResponse } from "../../../interface/response.booking.interface";
import LoadingSpinier from "../../../components/global/LoadingSpinier";

const stripePromise = loadStripe('pk_test_51OVWkVHfRFCfVZp8dwEwzuDWjUPgnMadf3sHxxb8mf3xzabCF3m5KEDKLHbGOafbOvQFi2NlokV0TBoWAqDaLDt500R0LHclLj');

const Payment = () => {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(useCurrentUser);
    const { bookingId } = useParams();
    const [booking, setBooking] = useState<TBookingResponse[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch(`http://localhost:5000/api/bookings/my-bookings?_id=${bookingId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then((res) => res.json()).then((data) => {
            setBooking(data?.data);
            setIsLoading(false)
        })
    }, [bookingId, token]);

    if (!user) return <Navigate to={'/auth/login'} replace state={location.pathname} />;
    if (user.role !== 'user') {
        dispatch(logout())
        // <Navigate to={'/auth/login'} replace state={location.pathname} />
    }
    if (isLoading) return <LoadingSpinier />

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
                                        <Link to={'/dashboard/user/bookings/manage'} className="flex justify-end font-bold">X</Link>
                                        <div className="flex flex-col md:flex-row mt-10">
                                            <div className="lg:w-1/2">
                                                <h1 className="text-start text-2xl font-bold flex items-center">Rent<span className="text-rose-600">NGo—</span></h1>
                                                <p><strong>Payment For:</strong> {
                                                    booking?.length ? booking[0].car?.name : null
                                                }</p>
                                                <div className="mt-3">
                                                    <p className="text-2xl"><strong>Total Due:</strong> ${
                                                        booking?.length ? booking[0].totalCost : null
                                                    }</p>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <p className="py-5 pr-10">Welcome to RentNGo payment system. Hope you get a good payment experience from here</p>
                                                </div>
                                            </div>
                                            <div className="lg:w-1/2">
                                                <Elements stripe={stripePromise}>
                                                    <Checkout bookingId={bookingId} booking={booking} />
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
