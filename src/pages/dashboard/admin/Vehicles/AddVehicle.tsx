import { Input, Select } from "antd";
const { TextArea } = Input;
import { heroDistrictFilterOptions } from "../../../../const/filter.district";
import { heroColorFilterOptions } from "../../../../const/filter.colors";
import antSelectOptionsGenerator from "../../../../utils/AntSelectOptionsGenerator";
import { fuelTypesOptions } from "../../../../const/options.fuel_types";

const AddVehicle = () => {

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Add New Vehicle</h1>
            <form className="mt-10 mx-5 space-y-5">

                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <label htmlFor="vehicle_name">Vehicle Name</label>
                        <Input
                            id="vehicle_name"
                            size="large"
                            showCount
                            maxLength={100}
                            placeholder="Type Vehicle Name" />
                    </div>
                    <div className=" flex-1">
                        <label htmlFor="location">Location</label>
                        <Select
                            id="location"
                            showSearch
                            placeholder='Select Your Area'
                            style={{ width: '100%', height: '40px' }}
                            optionFilterProp="label"
                            options={antSelectOptionsGenerator(heroDistrictFilterOptions)}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <label htmlFor="color">Color</label>
                        <Select
                            id="location"
                            showSearch
                            placeholder='Select Your Vehicle Color'
                            style={{ width: '100%', height: '40px' }}
                            optionFilterProp="label"
                            options={antSelectOptionsGenerator(heroColorFilterOptions)}
                        />
                    </div>

                    <div className="flex-1">
                        <label htmlFor="color">Fuel Type</label>
                        <Select
                            id="location"
                            showSearch
                            placeholder="Select Vehicle's Fuel Type"
                            style={{ width: '100%', height: '40px' }}
                            optionFilterProp="label"
                            options={antSelectOptionsGenerator(fuelTypesOptions)}
                        />
                    </div>
                </div>
                <div className="">
                    <label htmlFor="description">Description</label>
                    <TextArea
                        id="description"
                        showCount
                        maxLength={500}
                        placeholder="Write Detailed Description About Vehicle"
                        style={{ height: 120 }}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddVehicle;