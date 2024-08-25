import { DatePicker, Select } from "antd";
import { TFilterFOptions } from "../../interface/filter.options.interface";
import { heroDistrictFilterOptions } from "../../const/filter.district";
import { heroColorFilterOptions } from "../../const/filter.colors";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";

const HeroFilter = () => {
    const { control, handleSubmit } = useForm();
    const actualDistrictFilterOptions: TFilterFOptions[] = [];
    const actualColorFilterOptions: TFilterFOptions[] = [];

    for (let i: number = 0; i < heroDistrictFilterOptions.length; i++) {
        actualDistrictFilterOptions.push({
            value: heroDistrictFilterOptions[i],
            label: heroDistrictFilterOptions[i]
        });
    }

    for (let i: number = 0; i < heroColorFilterOptions.length; i++) {
        actualColorFilterOptions.push({
            value: heroColorFilterOptions[i],
            label: heroColorFilterOptions[i],
        });
    }

    //! actual action fn
    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    }

    return (
        <div className="w-96 hidden md:flex flex-col p-7 bg-rose-600 bg-opacity-20 rounded-md -mt-40">
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
                                style={{ width: '100%' }}
                                optionFilterProp="label"
                                options={actualDistrictFilterOptions}
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
                                style={{ width: '100%' }}
                                optionFilterProp="label"
                                options={actualColorFilterOptions}
                            />
                        )}
                    />
                </div>

                <div className="">
                    <p className="text-left mb-1">Date</p>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                style={{ width: '100%' }}
                            />
                        )}
                    />
                </div>

                <div className="!mt-5">
                    <button type="submit" className="py-2 w-full text-center px-2 bg-rose-600 hover:bg-rose-700 transition-all rounded-md">Search</button>
                </div>
            </form>
        </div>
    );
};

export default HeroFilter;
