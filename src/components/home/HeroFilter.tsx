// [#0C0C0C]

import { DatePicker, Select } from "antd";
import { TFilterFOptions } from "../../interface/filter.options.interface";
import { heroDistrictFilterOptions } from "../../const/filter.district";
import { heroColorFilterOptions } from "../../const/filter.colors";

const HeroFilter = () => {
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
        })
    }

    return (
        <div className="w-96 hidden md:flex flex-col p-7  bg-rose-600 bg-opacity-20 bg -mt-40">

            <form className="w-full space-y-2">
                <div className="">
                    <p className="text-left mb-1">Location</p>
                    <Select
                        showSearch
                        placeholder='Select Your Area'
                        style={{ width: '100%' }}
                        optionFilterProp="label"
                        options={actualDistrictFilterOptions}
                    />
                </div>

                <div className="">
                    <p className="text-left mb-1">Color</p>
                    <Select
                        showSearch
                        placeholder='Select Your Favorite Color'
                        style={{ width: '100%' }}
                        optionFilterProp="label"
                        options={actualColorFilterOptions}
                    />
                </div>

                <div className="">
                    <p className="text-left mb-1">Date</p>
                    <DatePicker
                        style={{ width: '100%' }}
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