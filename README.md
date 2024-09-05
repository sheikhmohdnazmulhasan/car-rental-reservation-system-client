# RentNGo - Car Rental Reservation System

## Overview

This project is a **RentNGo** designed to offer a smooth experience for browsing, booking, and managing cars. The system includes both customer and admin functionalities, providing a user-friendly interface for car rental services, while allowing administrators to manage inventory and reservations efficiently.

## Features

### Public Pages

- **Home Page**: Includes a hero section with a prominent "Book Now" button, car availability search, featured cars, customer testimonials, and a footer.
- **Car Listing Page**: Displays all available cars in a grid or list view with filtering options based on car type, price, and other relevant features.
- **Car Details Page**: Shows detailed information about selected cars with booking options.
- **About Us Page**: Contains the company's history, team, fleet, values, and contact information.
- **Error Page**: Custom 404 page and backend error handling.
- **User Authentication**: Sign up, login, password recovery with real-time validation and error handling.

### User Pages

- **User Dashboard**: Manage personal information, view booking history, and handle payment after car return.
- **Booking Management**: View, modify, or cancel existing bookings (with conditions).

### Admin Pages

- **Admin Dashboard**: Manage cars, bookings, users, and reports. Admins can block/activate users and promote users to admins.

### Payout Solution

- **Payment Integration**: Secure payment processing after car return using Stripe payment methods.

## Technologies Used

- **Frontend**: React, TypeScript, Zod, Hook-Form, Tailwind CSS, Ant Design, MUI, HeadlessUi and more.
- **Backend**: Node.js, Express, TypeScript, Mongoose, Bcrypt, Moment, Zod and more.
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment Integration**: Stripe
- **State Management**: Redux
- **Deployment**: Hosted on Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sheikhmohdnazmulhasan/rentNgo-car-rental-reservation-system-client.git
   cd rentNgo-car-rental-reservation-system-client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Project Structure

```bash
/src
│
├── components
│ ├── Admin
│ ├── User
│ ├── Booking
│ └── Shared
├── pages
│ ├── Home.tsx
│ ├── CarListing.tsx
│ ├── CarDetails.tsx
│ ├── AboutUs.tsx
│ ├── UserDashboard.tsx
│ ├── AdminDashboard.tsx
│ └── Error.tsx
├── assets
│ └── images
├── services
│ └── api.ts
├── utils
│ └── helpers.ts
└── App.tsx
```
