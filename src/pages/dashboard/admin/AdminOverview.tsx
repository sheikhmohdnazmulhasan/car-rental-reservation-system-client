import * as React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useStatisticsQuery } from '../../../redux/features/statistics/statistics.api';
import { TStatisticsAdmin } from '../../../interface/response.statistics.admin';
import LoadingSpinier from '../../../components/global/LoadingSpinier';
import FetchErrorElmt from '../../../components/error/FetchErrorElmt';

const AdminOverview: React.FC = () => {
    const { data, isLoading, isError } = useStatisticsQuery<{
        isError: boolean;
        isLoading: boolean;
        data: TStatisticsAdmin;
    }>({ role: 'admin' });

    const revenueData = [
        { x: 0, y: 5000, label: 'Jan' },
        { x: 1, y: 7000, label: 'Feb' },
        { x: 2, y: 8000, label: 'Mar' },
        // More data points...
    ];

    const userGrowthData = [
        { x: 'Jan', y: 150 },
        { x: 'Feb', y: 200 },
        { x: 'Mar', y: 250 },
        { x: 'Apr', y: 300 },
        { x: 'May', y: 350 },
        { x: 'Jun', y: 400 },
        // Add more months and data points as needed
    ];

    if (isLoading) return <LoadingSpinier />;
    if (!isLoading && isError) return <FetchErrorElmt />

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Overview
            </Typography>

            <Grid container spacing={3}>
                {/* Total Bookings */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Bookings</Typography>
                            <Typography variant="h4" color="rose.600">{data?.data?.total_booking}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Available Cars */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Available Cars</Typography>
                            <Typography variant="h4" color="rose.600">{data?.data?.total_vehicles}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Revenue */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Revenue</Typography>
                            <Typography variant="h4" color="rose.600">${parseFloat(String(data?.data?.total_revenue)).toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Monthly Revenue (Bar Chart) */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Monthly Revenue</Typography>
                            <BarChart
                                series={[
                                    {
                                        data: revenueData.map((point) => point.y),
                                        label: 'Revenue',
                                    },
                                ]}
                                width={400}
                                height={200}
                                sx={{ color: 'rose.600' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* User Growth (Line Chart) */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">User Growth</Typography>
                            <LineChart
                                series={[
                                    {
                                        data: userGrowthData.map((point) => point.y),
                                        label: 'Users',
                                    },
                                ]}
                                width={400}
                                height={200}
                                sx={{ color: 'rose.600' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Car locations (Pie Chart) */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Top Rent Locations</Typography>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 40, label: 'Rangpur' },
                                            { id: 1, value: 35, label: 'Chattogram' },
                                            { id: 2, value: 25, label: 'Dhaka' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                                sx={{ color: 'rose.600' }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminOverview;
