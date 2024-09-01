import { heroDistrictFilterOptions } from "../const/filter.district";
import { carFeatures } from "../const/options.features";
import { fuelTypesOptions } from "../const/options.fuel_types";

type TVehicleFeatures = (typeof carFeatures)[number];
type TVehicleFuelType = (typeof fuelTypesOptions)[number];
type TVehicleLocation = (typeof heroDistrictFilterOptions)[number];

export interface TVehicleResponse {
    _id: string;
    name: string;
    photo: string;
    pricePerHour: number;
    description: string;
    features: TVehicleFeatures[];
    color: string;
    fuelType: TVehicleFuelType;
    location: TVehicleLocation;
    status: "available" | "unavailable";
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}