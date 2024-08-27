import { TFilterFOptions } from "../interface/filter.options.interface";

function antSelectOptionsGenerator(options: string[]) {
    const actualOptionsForReturn: TFilterFOptions[] = [];

    for (let i: number = 0; i < options.length; i++) {
        actualOptionsForReturn.push({
            value: options[i],
            label: options[i]
        });
    };

    return actualOptionsForReturn;
}

export default antSelectOptionsGenerator;