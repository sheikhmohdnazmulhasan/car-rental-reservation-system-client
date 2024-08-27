import { Input, Select } from "antd";
const { TextArea } = Input;
import { heroDistrictFilterOptions } from "../../../../const/filter.district";
import { heroColorFilterOptions } from "../../../../const/filter.colors";
import antSelectOptionsGenerator from "../../../../utils/AntSelectOptionsGenerator";
import { fuelTypesOptions } from "../../../../const/options.fuel_types";
import { carFeatures } from "../../../../const/options.features";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddVehicle = () => {
    const { control, handleSubmit } = useForm();

    const handleCreateNewVehicle: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Add New Vehicle</h1>
            <form className="mt-10 mx-5 space-y-5" onSubmit={handleSubmit(handleCreateNewVehicle)}>

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

export default AddVehicle;
