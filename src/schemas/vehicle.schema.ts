import { z } from "zod";

const createVehicleValidationSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    color: z.string().nonempty({ message: 'Color is required' }),
    fuelType: z.string().nonempty({ message: ' Fuel type is required' }),
    features: z.array(z.string().nonempty({ message: 'Each feature must be a non-empty string' })),
    location: z.string().nonempty({ message: 'Location is required' }),
    pricePerHour: z.number().nonnegative({ message: 'Price Per Hour must be a non-negative number' }),
});

export const VehicleValidation = { createVehicleValidationSchema };