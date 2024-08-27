import { Input, Select } from "antd";
const { TextArea } = Input;
import { heroDistrictFilterOptions } from "../../../../const/filter.district";
import { heroColorFilterOptions } from "../../../../const/filter.colors";
import antSelectOptionsGenerator from "../../../../utils/AntSelectOptionsGenerator";
import { fuelTypesOptions } from "../../../../const/options.fuel_types";
import { carFeatures } from "../../../../const/options.features";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { VehicleValidation } from "../../../../schemas/vehicle.schema";
import { TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { fetchVehicleById, updateVehicle } from "../../../../api/vehicleApi"; // Assuming you have these API functions

// Infer the TypeScript type from the schema
type createVehicleSchema = TypeOf<typeof VehicleValidation.createVehicleValidationSchema>;

const EditVehicle = ({ vehicleId }: { vehicleId: string }) => {
    const [initialValues, setInitialValues] = useState<createVehicleSchema | null>(null);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<createVehicleSchema>({
        resolver: zodResolver(VehicleValidation.createVehicleValidationSchema)
    });

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const vehicle = await fetchVehicleById(vehicleId);
                setInitialValues(vehicle);
                // Populate form fields with fetched data
                Object.keys(vehicle).forEach((key) => {
                    setValue(key as keyof createVehicleSchema, vehicle[key]);
                });
            } catch (error) {
                console.error("Failed to fetch vehicle", error);
            }
        };

        fetchVehicle();
    }, [vehicleId, setValue]);

    const handleUpdateVehicle: SubmitHandler<FieldValues> = async (data) => {
        try {
            await updateVehicle(vehicleId, data);
            console.log("Vehicle updated successfully");
        } catch (error) {
            console.error("Failed to update vehicle", error);
        }
    }

    if (!initialValues) return <div>Loading...</div>;

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
                                maxLength={500}
                                placeholder="Write Detailed Description About Vehicle"
                                className="h-32" // Tailwind CSS class for height
                                aria-label="Description"
                            />
                        )}
                    />
                    {errors.description && <small className=" ml-1 text-rose-600">{errors.description?.message}</small>}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
                    >
                        Update Vehicle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditVehicle;
