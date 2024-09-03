import { TFullUser } from "./user.interface";

interface AdditionalInfo {
    nid: string;
    drivingLicense: string;
    extraFeatures: string[];
}

interface Car {
    _id: string;
    name: string;
    description: string;
    color: string;
    fuelType: string;
    photo: string;
    features: string[];
    pricePerHour: number;
    location: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface TBookingResponse {
    additionalInfo: AdditionalInfo;
    _id: string;
    date: string;
    startTime: string;
    endTime: string | null;
    totalCost: number;
    car: Car;
    user: TFullUser;
    status: 'succeed' | 'ongoing' | 'canceled' | 'pending';
    paymentStatus?: "unverified" | "verified"
    createdAt: string;
    updatedAt: string;
}
