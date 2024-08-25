// [#0C0C0C]

import { Select } from "antd";

const HeroFilter = () => {

    return (
        <div className="w-96 hidden md:flex flex-col justify-center items-center bg-rose-600 bg-opacity-20 bg h-96">

            <form className="w-full">
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    optionFilterProp="label"
                    options={[
                        {
                            value: '1',
                            label: 'Not Identified',
                        },
                        {
                            value: '2',
                            label: 'Closed',
                        },
                        {
                            value: '3',
                            label: 'Communicated',
                        },
                        {
                            value: '4',
                            label: 'Identified',
                        },
                        {
                            value: '5',
                            label: 'Resolved',
                        },
                        {
                            value: '6',
                            label: 'Cancelled',
                        },
                    ]}
                />
            </form>
        </div>
    );
};

export default HeroFilter;