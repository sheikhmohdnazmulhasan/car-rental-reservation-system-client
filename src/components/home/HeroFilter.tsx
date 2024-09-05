import { DatePicker, Select } from "antd";
import { heroDistrictFilterOptions } from "../../const/filter.district";
import { heroColorFilterOptions } from "../../const/filter.colors";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import antSelectOptionsGenerator from "../../utils/AntSelectOptionsGenerator";
import { useState } from "react";
import { TVehicleResponse } from "../../interface/response.vehicle.interface";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HeroFilter = () => {
    const { control, handleSubmit } = useForm();
    const [locationX, setLocationX] = useState<string | null>(null)
    const [colorX, setColorX] = useState<string | null>(null)
    const [data, setData] = useState<TVehicleResponse[] | null>(null);
    const navigate = useNavigate();


    //! actual action fn
    const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data?.location && !data.color) return;

        const location = data?.location?.charAt(0)?.toLowerCase() + data?.location?.slice(1) || ''
        const color = data?.color?.charAt(0)?.toLowerCase() + data?.color?.slice(1) || ''

        try {
            const res = await axios.get(`https://car-rental-reservation-system-nine.vercel.app/api/cars`, {
                params: {
                    location,
                    color
                }
            });

            if (!res?.data?.data?.length) {
                Swal.fire({
                    icon: 'info',
                    title: 'No Vehicles Found!',
                    text: 'No vehicles were found in your filter. Please try another color or location or view all vehicle'
                });
                return
            };

            setData(res?.data?.data || null);
            setColorX(color);
            setLocationX(location);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong 😥')
        }
    }

    // navigate to vehicles route with query
    function handleNavigateToVehicleRoute() {
        if (locationX && !colorX) {
            return navigate(`/vehicles?location=${locationX}`);
        } else if (colorX && !locationX) {
            return navigate(`/vehicles?color=${colorX}`);
        } else {
            return navigate(`/vehicles?location=${locationX}&color=${colorX}`)
        };
    };

    return (
        <div data-aos="zoom-out" className="w-96 hidden md:flex flex-col p-7 bg-rose-600 bg-opacity-20 rounded-md -mt-40">
            <form className="w-full space-y-2" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="">
                    <p className="text-left mb-1">Location</p>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                showSearch
                                placeholder='Select Your Area'
                                style={{ width: '100%', height: '40px' }}
                                optionFilterProp="label"
                                options={antSelectOptionsGenerator(heroDistrictFilterOptions)}
                            />
                        )}
                    />
                </div>

                <div className="">
                    <p className="text-left mb-1">Color</p>
                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                showSearch
                                placeholder='Select Your Favorite Color'
                                style={{ width: '100%', height: '40px' }}
                                optionFilterProp="label"
                                options={antSelectOptionsGenerator(heroColorFilterOptions)}
                            />
                        )}
                    />
                </div>

                <div className="">
                    <p className="text-left mb-1">Date</p>
                    <DatePicker
                        style={{ width: '100%', height: '40px' }}
                    />
                </div>

                <div className="!mt-5">
                    {!data?.length ? <button type="submit" className="py-2 w-full text-center px-2 bg-rose-600 hover:bg-rose-700 transition-all rounded-md">Search</button> :
                        <button type="button" onClick={handleNavigateToVehicleRoute} className="py-2 w-full text-center px-2 bg-rose-600 hover:bg-rose-700 transition-all rounded-md">Browse {data?.length} Vehicles</button>}
                </div>
            </form>
        </div>
    );
};

export default HeroFilter;
