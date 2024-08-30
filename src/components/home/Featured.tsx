import React, { useEffect, useRef } from 'react';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { useGetVehiclesQuery } from '../../redux/features/vehicle/vehicle.api';
import { TVehicleResponse } from '../../interface/response.vehicle.interface';
import LoadingSpinier from '../global/LoadingSpinier';

const Featured: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderInstanceRef = useRef<KeenSliderInstance | null>(null);
    const { isError, isLoading, data } = useGetVehiclesQuery(undefined);


    useEffect(() => {
        if (sliderRef.current) {
            sliderInstanceRef.current = new KeenSlider(
                sliderRef.current,
                {
                    loop: true,
                    slides: {
                        origin: 'center',
                        perView: 1.25,
                        spacing: 16,
                    },
                    breakpoints: {
                        '(min-width: 1024px)': {
                            slides: {
                                origin: 'auto',
                                perView: 1.5,
                                spacing: 32,
                            },
                        },
                    },
                },
                []
            );
        }

        return () => {
            sliderInstanceRef.current?.destroy();
        };
    }, [data]);

    const handlePrev = () => {
        sliderInstanceRef.current?.prev();
    };

    const handleNext = () => {
        sliderInstanceRef.current?.next();
    };

    if (isLoading) return <LoadingSpinier />;
    if (isError) return <p>Oops! Something went wrong!</p>

    return (
        <section className="">
            <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Discover the Thrill Machines
                        </h2>
                        <p className="mt-4 text-gray-700">
                            Feel the adrenaline with our sleek, high-powered vehicles, built for those who crave excitement.
                        </p>
                        <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                            <button
                                aria-label="Previous slide"
                                onClick={handlePrev}
                                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 rtl:rotate-180"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <button
                                aria-label="Next slide"
                                onClick={handleNext}
                                className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                            >
                                <svg
                                    className="size-5 rtl:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 5l7 7-7 7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="-mx-6 lg:col-span-2 lg:mx-0">
                        <div ref={sliderRef} className="keen-slider">

                            {data?.data?.slice(2, 5).map((vehicle: TVehicleResponse, indx: number) => {
                                return (
                                    <div key={indx} className="keen-slider__slide">
                                        <blockquote
                                            className="flex h-full flex-col justify-between bg-white shadow-sm"
                                        >
                                            <div className="relative border flex flex-col md:flex-row bg-white ">

                                                < div className="bg-gray-200 absolute right-2 ring-0 top-2 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block" >
                                                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                                                </ div>

                                                <div className="w-full md:w-[50%] bg-white grid place-items-center">
                                                    <img src={vehicle.photo} className="w-full h-full object-cover " />
                                                </div>
                                                <div className="w-full md:w-[50%] bg-white flex flex-col space-y-2 p-6">

                                                    <h3 className="font-semibold text-gray-800 text-xl mt-1">{vehicle.name}</h3>
                                                    <p className='md:block hidden'>{vehicle.description.slice(0, 100)}...</p>
                                                    <p className='md:hidden'>{vehicle.description.slice(0, 50)}...</p>
                                                    <div className="flex justify-between item-center">
                                                        <p className="text-gray-500 font-medium hidden md:block"> <strong>Location:</strong>{vehicle.location} </p>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="">
                                                            <p className="text-xl font-black text-rose-600">
                                                                ${vehicle.pricePerHour}
                                                                <span className="font-normal text-gray-600 text-base">/Hour</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </blockquote>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;