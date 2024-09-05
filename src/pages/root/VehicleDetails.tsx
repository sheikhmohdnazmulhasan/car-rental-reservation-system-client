import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleVehicleQuery, useGetVehiclesQuery } from "../../redux/features/vehicle/vehicle.api";
import FetchErrorElmt from "../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../components/global/LoadingSpinier";
import ReactImageMagnify from 'react-image-magnify';
import Footer from "../../components/root/Footer";
import { TVehicleResponse } from "../../interface/response.vehicle.interface";
import Navbar from "../../components/root/Navbar";
import VehicleCard from "../../components/vehicle/VehicleCard";
import { FC, useState } from "react";
import { useGetFullUserQuery } from "../../redux/features/user/user.api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/auth.slice";
import { TFullUser } from "../../interface/user.interface";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCreateNewBookingMutation } from "../../redux/features/booking/booking.api";
import toast from "react-hot-toast";
import { TNotificationEmail } from "../../interface/email.emailjs.params.interface";
import sendEmail from "../../utils/sendEmail";

const VehicleDetails: FC = () => {
    const { _id } = useParams<{ _id: string }>();
    const user = useAppSelector(useCurrentUser)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [createNewBooking] = useCreateNewBookingMutation();

    const { data: item, isError: singleError, isLoading: singleLoading } = useGetSingleVehicleQuery<{
        data: {
            data: TVehicleResponse
        };
        isLoading: boolean;
        isError: boolean;
    }>({ _id: _id as string });

    const { data } = useGetVehiclesQuery<{
        data: {
            data: TVehicleResponse[]
        }
    }>(undefined);

    const moreItemExceptThisOne: TVehicleResponse[] = data?.data?.filter((data: { _id: string; }) => data._id !== item?.data?._id);
    const randomIndex = Math.floor(Math.random() * moreItemExceptThisOne?.length);
    const { data: fullUser } = useGetFullUserQuery<{
        data: {
            data: TFullUser
        }
    }>([{ email: user?.user }], { skip: !user });

    function handleOpenBookingModal() {
        if (!user) {
            navigate(`/auth/login?redirect=${item?.data?._id}`);
            return
        }

        switch (user?.role) {
            case 'admin':
                Swal.fire({
                    icon: 'info',
                    title: 'Yeo! Admin Cannot Book Vehicles'
                })
                break;
            default:
                setOpenModal(true)
                break;
        }
    }

    const handleCreateNewBooking: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Working...');
        const date = new Date()
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const payload: {
            carId: string;
            date: string;
            additionalInfo: {
                drivingLicense: string;
                nid: string;
                extraFeatures?: string[];
            }
        } = {
            carId: _id as string,
            date: formattedDate,
            additionalInfo: {
                drivingLicense: data.drivingLicense as string,
                nid: data.nid as string
            }
        };

        try {
            const res = await createNewBooking({ payload });
            if (res.data?.success) {
                // DONE: send email to customer for successful booking
                const EMAIL_PARAMS: TNotificationEmail = {
                    name: fullUser?.data?.name,
                    email: fullUser?.data?.email,
                    subject: `Booking Received: Pending Verification for - ${item?.data?.name}`,
                    description: `Thank you for choosing RentNGo! We have received your booking and it is currently pending verification.
                    Our team is reviewing your booking, and you will receive a confirmation email if your booking is approved.
                    
                    If you have any questions or need further assistance, please feel free to contact us.`
                };

                const emailSend = await sendEmail(2, EMAIL_PARAMS);
                if (emailSend?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Vehicle Booked Successfully',
                        text: 'We have emailed you the next step, please check your inbox'
                    });
                    toast.dismiss(toastId);
                }
                navigate('/');
            } else {
                toast.error('Oops! Something went Wrong 😒', { id: toastId });
            }

        } catch (error) {
            toast.error('Oops! Something went Wrong 😒', { id: toastId });
            console.log(error);
        }
    }

    if (singleLoading) return <LoadingSpinier />;
    if (singleError) return <FetchErrorElmt />;

    return (
        <div className="font-sans bg-white">
            <Navbar />
            <div data-aos='fade-left' className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        alt: 'Product',
                                        isFluidWidth: true,
                                        src: item?.data?.photo,
                                    },
                                    largeImage: {
                                        src: item?.data?.photo,
                                        width: 1200,
                                        height: 1800,
                                    },
                                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
                                    enlargedImageStyle: { objectFit: 'cover' },
                                }}
                            />
                        </div>
                        <div className="text-left mt-5 hidden md:block">{item?.data?.description}</div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">{item?.data?.name} {item?.data?.color}</h2>
                        <p className="">{item?.data?.description.slice(0, 200)}...</p>

                        {/* rating */}
                        <div className="flex space-x-2 mt-4">
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <h4 className="text-gray-800 text-base">{item?.data?.pricePerHour - 100} Reviews</h4>
                        </div>

                        <div className="mt-5">
                            <h1 className="font-semibold">Location: {item?.data?.location}, Bangladesh</h1>
                            <h1 className="font-semibold">Fuel Type: {item?.data?.fuelType}</h1>
                            <div className="flex gap-1 mt-2">
                                <p className="font-semibold">Features:</p>
                                <div className=" flex items-center gap-2 flex-wrap">
                                    {
                                        item?.data?.features?.map((feature: string, indx: number) => {
                                            return <span key={indx} className="bg-gray-200 text-sm rounded-sm px-2">{feature}</span>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className=""><span className="text-gray-800 text-3xl font-bold">${item?.data?.pricePerHour}</span> /Hour</p>
                        </div>

                        {item?.data?.status === 'available' ? (
                            <div className="flex flex-wrap gap-4 mt-8">

                                <button onClick={handleOpenBookingModal} type="button" className="w-full  px-4 py-2.5 border bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded">Book Now</button>
                            </div>
                        ) : (
                            <button type="button" className="w-full mt-20 px-4 py-2.5 border border-rose-600 bg-transparent hover:bg-gray-50 text-rose-800 text-sm font-semibold cursor-not-allowed rounded">Vehicle Unavailable</button>
                        )}
                    </div>
                </div>
            </div>

            {moreItemExceptThisOne?.length && (
                <div className="mx-5 md:mx-10 lg:mx-16 py-20">
                    <h1 className="text-4xl font-semibold">Browse More Similar Vehicles</h1>
                    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
                        {moreItemExceptThisOne?.slice(randomIndex, randomIndex + 2).map((item: TVehicleResponse, indx: number) => (
                            <VehicleCard key={indx} {...item} />
                        ))}
                    </div>
                </div>
            )}

            <Footer />


            {/* booking form */}
            <div className="mx-auto flex w-72 items-center justify-center">
                <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute rounded-lg bg-white drop-shadow-2xl w-[95%] md:w-[60%] ${openModal ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}>
                        <form onSubmit={handleSubmit(handleCreateNewBooking)} className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10">
                            <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-10 cursor-pointer fill-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                            <h1 className="pb-8 text-3xl backdrop-blur-sm">
                                Book {item?.data?.name} {item?.data?.fuelType} {item?.data?.color}
                            </h1>
                            <div className="md:flex w-full gap-4 space-y-5 md:space-y-0">
                                <div className="flex-1">
                                    <label htmlFor="name" className="block mb-2">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <input defaultValue={fullUser?.data?.name} id="name" type="text" className="block w-full rounded-lg p-3  outline-none drop-shadow-lg bg-white" readOnly />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="email" className="block mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input defaultValue={fullUser?.data?.email} id="email" type="email" className="block w-full rounded-lg p-3  outline-none drop-shadow-lg bg-white" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex w-full gap-4 mt-5 space-y-5 md:space-y-0">
                                <div className="flex-1">
                                    <label htmlFor="nid" className="block mb-2">
                                        NID Number<span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <input id="nid" type="text" placeholder="7182278018" className="block w-full rounded-lg p-3  outline-none drop-shadow-lg bg-white" required {...register('nid')} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="driving" className="block mb-2">
                                        Driving Licenses Number<span className="text-red-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <input id="driving" type="text" placeholder="DL-4894293021" className="block w-full rounded-lg p-3  outline-none drop-shadow-lg bg-white" {...register('drivingLicense')} required />
                                    </div>
                                </div>
                            </div>
                            {/* button type will be submit for handling form submission*/}
                            <button type="submit" className="relative py-2.5 px-5 rounded-md text-white mt-6 bg-rose-600 drop-shadow-lg hover:bg-rose-700">
                                Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;