import * as React from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import { useGetUserSpecificBookingsQuery } from '../../../redux/features/booking/booking.api';
import { TBookingResponse } from '../../../interface/response.booking.interface';
import LoadingSpinier from '../../../components/global/LoadingSpinier';
import FetchErrorElmt from '../../../components/error/FetchErrorElmt';

const UserOverview: React.FC = () => {
    const { data: bookingHistory, isLoading, isError } = useGetUserSpecificBookingsQuery<{
        data: {
            data: TBookingResponse[]
        };
        isLoading: boolean;
        isError: boolean;
    }>([]);

    // Sample data for booking history, cancellation, and success rate
    const totalBookings = bookingHistory?.data?.length;
    const successCount = bookingHistory?.data?.filter((booking: TBookingResponse) => booking.status === 'succeed').length;
    const cancelCount = bookingHistory?.data?.filter((booking: TBookingResponse) => booking.status === 'canceled').length;

    const successPercentage = (successCount / totalBookings) * 100;
    const cancelPercentage = (cancelCount / totalBookings) * 100;

    const successRateData = [
        {
            id: 0,
            value: parseFloat(successPercentage.toFixed(2)),
            label: 'Success'
        },
        {
            id: 1,
            value: parseFloat(cancelPercentage.toFixed(2)),
            label: 'Cancelled'
        },
    ];

    if (isLoading) return <LoadingSpinier />;
    if (isError) return <FetchErrorElmt />

    return (
        <Grid data-aos='fade-left' container spacing={3}>
            {/* Other dashboard components */}

            {/* Booking History */}
            <Grid item xs={12} md={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Booking History</Typography>
                        <List>
                            {bookingHistory?.data.slice(0, 4).reverse().map((booking) => (
                                <ListItem key={booking._id}>
                                    <ListItemText
                                        primary={`${booking?.car?.name}`}
                                        secondary={`Date: ${booking.date} - Status: ${booking.status}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* Booking Success and Cancellation Rate (Pie Chart) */}
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Booking Success vs Cancellation Rate</Typography>
                        <PieChart
                            series={[
                                {
                                    data: successRateData, // Directly pass the array of objects
                                },
                            ]}
                            width={400}
                            height={200}
                            sx={{ color: 'rose.600' }}
                        />

                    </CardContent>
                </Card>
            </Grid>

            {/* Booking Success Over Time (Line Chart) */}
            <Grid item xs={12} md={6}>
                <Card>
                    <LineChart
                        series={[
                            {
                                data: bookingHistory?.data
                                    .filter((booking) => booking.status === 'succeed')
                                    .map((_, index) => index + 1),
                                label: 'Success Rate',
                            },
                        ]}
                        width={400}
                        height={200}
                        sx={{ color: 'rose.600' }}
                    />

                </Card>
            </Grid>
        </Grid>
    );
};

export default UserOverview;
