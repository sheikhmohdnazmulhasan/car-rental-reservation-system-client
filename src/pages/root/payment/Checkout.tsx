
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import React, { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCurrentToken } from "../../../redux/features/auth/auth.slice";
import { useAppSelector } from "../../../redux/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TNotificationEmail } from "../../../interface/email.emailjs.params.interface";
import { TBookingResponse } from "../../../interface/response.booking.interface";

const Checkout: React.FC<{ bookingId: string | undefined; booking: TBookingResponse[] | null }> = ({ bookingId, booking }) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const stripe = useStripe();
    const elements = useElements();
    const token = useAppSelector(useCurrentToken);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/booking/pay?booking=${bookingId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Ensure token is properly set
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Unauthorized. Please log in again.");
                    } else if (response.status === 417) {
                        throw new Error("booking is not successful yet or the payment is already completed");
                    } else if (response.status === 400) {
                        throw new Error("You cannot make payments on someone else's booking. Not event GF/BF")
                    } else {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error("Error fetching client secret:", error.message);
                toast.error(error.message || "An error occurred. Please try again.");
                navigate('/dashboard/user/bookings/manage');
            }
        };

        if (token) {
            fetchClientSecret();
        } else {
            navigate('/auth/login'); // Redirect to login if no token is available
        }
    }, [bookingId, token, navigate]);


    const handlePayment = async (e: FormEvent) => {
        const toastId = toast.loading('Processing...');
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error('Something went wrong. plz try again', { id: toastId });
            navigate('/dashboard/user/bookings/manage');
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret as string,
            {
                payment_method: {
                    card: elements.getElement(CardNumberElement)!
                },
            },
        );

        if (confirmError) {
            toast.error('Something went wrong. plz try again', { id: toastId });
            navigate('/dashboard/user/bookings/manage');
        }

        if (paymentIntent?.status === "succeeded") {
            // TODO: update the booking's payment status
            toast.dismiss(toastId);
            const EMAIL_PARAMS: TNotificationEmail = {
                name: booking ? booking[0].user.name as string : null,
                email: booking ? booking[0].user.email as string : null,
                subject: ` Payment Confirmation: Thank You for Settling Your Account`,
                description: `We have successfully received your payment of [Total Amount] for your recent rental with RentNGo.

                Transaction ID: ${paymentIntent.id}
                Amount Paid: ${booking ? booking[0].totalCost : null}

                
                `

            }
            Swal.fire({
                icon: 'success',
                title: 'Successfully Paid',
                text: 'Thanks for clearing your due, we have emailed you the transaction id'
            });
        }
    }

    return (
        <div>
            <form
                onSubmit={handlePayment}
                className="px-5 py-2  shadow-xl rounded-md"
            >
                <div className="mb-4">
                    <h1 className="text-start font-semibold text-xl">
                        Pay with card
                    </h1>
                </div>
                <div className="mb-3">
                    <label className="block text-start font-bold text-sm mb-2 ml-1">
                        Email
                    </label>
                    <input
                        className="w-full px-3  py-1 mb-1 border-2 bg-transparent border-gray-200 rounded-md focus:outline-none"
                        placeholder="Your Email"
                        type="text"
                        // defaultValue={user?.displayName}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-start font-bold text-sm mb-2 ml-1">
                        Card Information
                    </label>
                    <div className="mb-3">
                        <input
                            className="w-full px-3  py-1 mb-1 border-2 bg-transparent border-gray-200 rounded-md focus:outline-none"
                            placeholder="Full name on card"
                            type="text"
                            required
                        />
                    </div>
                    <label className="block text-start font-bold text-sm mb-2 ml-1">
                        Card Number
                    </label>
                    <CardNumberElement
                        id="card-number"
                        className="w-full px-3 py-2 mb-1 border-2 border-gray-300 rounded-md"
                        options={{
                            showIcon: true,
                            placeholder: "Card Number",
                        }}
                    />
                </div>
                <div className="mb-3 -mx-2 md:flex justify-between items-center">
                    <div className="px-2">
                        <label
                            htmlFor="expire-date"
                            className="block font-bold text-sm mb-2 ml-1 "
                        >
                            Expiration date
                        </label>
                        <CardExpiryElement
                            id="expire-date"
                            className="px-3 py-2 mb-1 border-2 border-gray-200 rounded-md"
                        />
                    </div>
                    <div className="px-2">
                        <label htmlFor="cvc" className="block font-bold text-sm mb-2 ml-1">
                            Security code
                        </label>
                        <CardCvcElement
                            id="cvc"
                            className="w-full md:w-24 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md"
                        />
                    </div>
                    <div className="px-2">
                        <label
                            htmlFor="postal-code"
                            className="block font-bold text-sm mb-2 ml-1"
                        >
                            Postal code
                        </label>
                        <input
                            id="postal-code"
                            required
                            maxLength={5}
                            placeholder="POST"
                            className="w-full md:w-24 px-3 py-1 mb-1 border-2 bg-transparent border-gray-200 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    disabled={!stripe || !elements}
                    className="btn w-full bg-rose-600 hover:bg-rose-700 transition-all text-white rounded-md text-xl"
                    type="submit">
                    Pay Now
                </button>

            </form>
        </div>
    );
};

export default Checkout;
