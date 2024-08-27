import { z } from "zod";

const createVehicleValidationSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    description: z.string().nonempty({ message: 'Description is required' }),
    color: z.string().nonempty({ message: 'Color is required' }),
    isElectric: z.boolean({ message: 'IsElectric must be a boolean' }),
    features: z.array(z.string().nonempty({ message: 'Each feature must be a non-empty string' })),
    location: z.string().nonempty({ message: 'Location is required' }),
    pricePerHour: z.number().nonnegative({ message: 'PricePerHour must be a non-negative number' }),
});

export const vehicleValidation = { createVehicleValidationSchema };