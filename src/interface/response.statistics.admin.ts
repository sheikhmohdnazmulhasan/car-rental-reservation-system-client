
export interface TStatisticsAdmin {
    success: boolean;
    message: string;
    data: {
        total_booking: number;
        total_vehicles: number,
        total_revenue: number
    }
}