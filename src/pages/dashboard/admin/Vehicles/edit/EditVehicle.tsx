import { Input, Select } from "antd";
const { TextArea } = Input;
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { SetStateAction, useEffect, useState } from "react";
import { VehicleValidation } from "../../../../../schemas/vehicle.schema";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import antSelectOptionsGenerator from "../../../../../utils/AntSelectOptionsGenerator";
import { heroDistrictFilterOptions } from "../../../../../const/filter.district";
import { heroColorFilterOptions } from "../../../../../const/filter.colors";
import { fuelTypesOptions } from "../../../../../const/options.fuel_types";
import { carFeatures } from "../../../../../const/options.features";
import { TVehicleResponse } from "../../../../../interface/response.vehicle.interface";
import LoadingSpinier from "../../../../../components/global/LoadingSpinier";
import FetchErrorElmt from "../../../../../components/error/FetchErrorElmt";
import { usePatchVehicleMutation } from "../../../../../redux/features/vehicle/vehicle.api";
import toast from "react-hot-toast";
import uploadImageToImgBb from "../../../../../utils/uploadImageToImgBb";

// Infer the TypeScript type from the schema
type createVehicleSchema = TypeOf<typeof VehicleValidation.createVehicleValidationSchema>;

const EditVehicle: React.FC = () => {
    const { _id } = useParams();
    const [showFileName, setShowFileName] = useState<SetStateAction<{ name: string }>>({ name: 'Error' });
    const [initialValues, setInitialValues] = useState<TVehicleResponse | null>(null);
    const [fetchError, setFetchError] = useState<SetStateAction<boolean>>(false);
    const [patchVehicle] = usePatchVehicleMutation();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<createVehicleSchema>({
        resolver: zodResolver(VehicleValidation.createVehicleValidationSchema)
    });

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const vehicle = await axios.get(`http://localhost:5000/api/cars/${_id}`);
                setInitialValues(vehicle?.data?.data);
                setShowFileName({ name: `${vehicle?.data?.data?.photo.slice(0, 35)}...` })
                // Populate form fields with fetched data
                Object.keys(vehicle?.data?.data).forEach((key) => {
                    setValue(key as keyof createVehicleSchema, vehicle?.data?.data[key]);
                });
            } catch (error) {
                console.error("Failed to fetch vehicle", error);
                setFetchError(true);
            }
        };

        fetchVehicle();
    }, [_id, setValue]);

    const handleUpdateVehicle: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Working...');
        if (`${initialValues?.photo.slice(0, 35)}...` !== showFileName?.name) {
            // photo changed. wll upload the new image in imgBb

            const imgBbResponse = await uploadImageToImgBb(showFileName as File);
            if (imgBbResponse.success) {
                await patchVehicle({
                    _id,
                    payload: { ...data, photo: imgBbResponse.url }
                }).then(() => {
                    toast.success(`${initialValues?.name} is Updated Successfully 🥱`, { id: toastId });
                    navigate(`/dashboard/admin/vehicles/manage/view`);

                }).catch((error) => {
                    console.log(error);
                    toast.error('Something went wrong 🫥', { id: toastId });
                });
            };

        } else {
            await patchVehicle({
                _id,
                payload: data,
            }).then(() => {
                toast.success(`${initialValues?.name} is Updated Successfully 🥱`, { id: toastId });
                navigate(`/dashboard/admin/vehicles/manage/view`);

            }).catch((error) => {
                console.log(error);
                toast.error('Something went wrong 🫥', { id: toastId });
            });
        };
    };

    if (!initialValues && !fetchError) return <div className="mt-20">
        <LoadingSpinier />;
    </div>
    if (fetchError) return <FetchErrorElmt />;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Edit Vehicle</h1>
            <form className="mt-10 mx-5 space-y-5" onSubmit={handleSubmit(handleUpdateVehicle)}>

                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <label htmlFor="vehicle_name">Vehicle Name</label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="vehicle_name"
                                    size="large"
                                    showCount
                                    maxLength={100}
                                    placeholder="Type Vehicle Name"
                                    aria-label="Vehicle Name"
                                />
                            )}
                        />
                        {errors.name && <small className=" ml-1 text-rose-600">{errors.name?.message}</small>}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="location">Location</label>
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id="location"
                                    showSearch
                                    placeholder='Select Your Area'
                                    style={{ width: '100%', height: '40px' }}
                                    optionFilterProp="label"
                                    options={antSelectOptionsGenerator(heroDistrictFilterOptions)}
                                    aria-label="Location"
                                />
                            )}
                        />
                        {errors.location && <small className=" ml-1 text-rose-600">{errors.location?.message}</small>}
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <label htmlFor="color">Color</label>
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id="color"
                                    showSearch
                                    placeholder='Select Your Vehicle Color'
                                    style={{ width: '100%', height: '40px' }}
                                    optionFilterProp="label"
                                    options={antSelectOptionsGenerator(heroColorFilterOptions)}
                                    aria-label="Color"
                                />
                            )}
                        />
                        {errors.color && <small className=" ml-1 text-rose-600">{errors.color?.message}</small>}
                    </div>

                    <div className="flex-1">
                        <label htmlFor="fuel_type">Fuel Type</label>
                        <Controller
                            name="fuelType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id="fuel_type"
                                    showSearch
                                    placeholder="Select Vehicle's Fuel Type"
                                    style={{ width: '100%', height: '40px' }}
                                    optionFilterProp="label"
                                    options={antSelectOptionsGenerator(fuelTypesOptions)}
                                    aria-label="Fuel Type"
                                />
                            )}
                        />
                        {errors.fuelType && <small className=" ml-1 text-rose-600">{errors.fuelType?.message}</small>}
                    </div>
                </div>

                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <label htmlFor="features">Features</label>
                        <Controller
                            name="features"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    id="features"
                                    showSearch
                                    mode="tags"
                                    placeholder='Select Your Vehicle Features'
                                    style={{ width: '100%', height: '40px' }}
                                    optionFilterProp="label"
                                    options={antSelectOptionsGenerator(carFeatures)}
                                    aria-label="Features"
                                />
                            )}
                        />
                        {errors.features && <small className=" ml-1 text-rose-600">{errors.features?.message}</small>}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="pricePerHour">Price Per Hour</label>
                        <Controller
                            name="pricePerHour"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="pricePerHour"
                                    size="large"
                                    placeholder="Type Your Vehicle Price"
                                    aria-label="Price Per Hour"
                                    type="number"
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        field.onChange(value);
                                    }}
                                    value={field.value || ''}
                                />
                            )}
                        />
                        {errors.pricePerHour && <small className=" ml-1 text-rose-600">{errors.pricePerHour?.message}</small>}
                    </div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                id="description"
                                showCount
                                maxLength={2000}
                                placeholder="Write Detailed Description About Vehicle"
                                className="h-32" // Tailwind CSS class for height
                                aria-label="Description"
                            />
                        )}
                    />
                    {errors.description && <small className=" ml-1 text-rose-600">{errors.description?.message}</small>}
                </div>
                <div className="">
                    <label htmlFor="">Vehicle Picture</label>
                    <div>
                        <label htmlFor="type2-1" className="flex max-w-[380px] md:w-[380px]">
                            <div className="w-fit whitespace-nowrap  bg-rose-500  px-2 py-1 text-sm text-white">Choose File</div>
                            <div className=" flex w-full max-w-[380px] items-center  border-b-[2px] border-rose-500 px-2 text-sm font-medium text-gray-400">{showFileName!.name.length > 35 ? `${showFileName!.name.slice(0, 35)}...` : showFileName!.name}</div>
                        </label>
                        <input
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const imageFile = e.target.files[0];
                                    setShowFileName(imageFile);
                                }
                            }} className="hidden" type="file" name="" id="type2-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                    >
                        Add Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditVehicle;
