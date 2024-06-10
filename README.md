# DiagnoEase Server

This repository contains the server-side code for DiagnoEase, a medical diagnostic platform. The server is built using Express.js and connects to a MongoDB database.

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/diagnoease-server.git
    cd diagnoease-server
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=5000
    DB_USER=your_db_user
    DB_PASS=your_db_password
    ACCESS_TOKEN_SECRET=your_access_token_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    NODE_ENV=development
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

The server should now be running on [http://localhost:5000](http://localhost:5000).

## Features

- **User Authentication**: Secure user registration, login, and logout with JWT-based authentication.
- **User Profile Management**: Users can manage their profiles, including personal information and profile pictures.
- **Medical Tests**: Manage and book medical tests.
- **Payment Integration**: Secure payment processing with Stripe.
- **Admin Dashboard**: Admin functionalities for managing users, tests, appointments, and banners.
- **Appointment Booking**: Users can book and manage their appointments.
- **Data Visualization**: Admin dashboard includes statistical data visualization.

## API Endpoints

Here is a list of the main API endpoints:

| HTTP Method | Endpoint                         | Description                                               | Authentication | Admin Only |
|-------------|----------------------------------|-----------------------------------------------------------|----------------|------------|
| POST        | `/jwt`                           | Generate JWT token                                        | No             | No         |
| POST        | `/logout`                        | Clear JWT token                                           | No             | No         |
| GET         | `/districts`                     | Get all districts                                         | No             | No         |
| GET         | `/upazilas`                      | Get all upazilas                                          | No             | No         |
| POST        | `/create-payment-intent`         | Create a payment intent                                   | Yes            | No         |
| POST        | `/user`                          | Add a new user                                            | No             | No         |
| GET         | `/users`                         | Get all users                                             | Yes            | Yes        |
| GET         | `/user/:email`                   | Get user by email                                         | Yes            | No         |
| PATCH       | `/user/:id`                      | Update user information                                   | Yes            | No         |
| POST        | `/test`                          | Add a new test                                            | Yes            | Yes        |
| GET         | `/tests`                         | Get all tests (Admin)                                     | Yes            | Yes        |
| GET         | `/available-tests`               | Get available tests (User)                                | No             | No         |
| GET         | `/test/:id`                      | Get test by ID                                            | Yes            | No         |
| PATCH       | `/test/:id`                      | Update test information                                   | Yes            | Yes        |
| DELETE      | `/test/:id`                      | Delete a test                                             | Yes            | Yes        |
| POST        | `/booking`                       | Book an appointment                                       | Yes            | No         |
| DELETE      | `/booking/:id`                   | Delete an appointment                                     | Yes            | No         |
| GET         | `/appointments/:testId`          | Get appointments by test ID                               | Yes            | Yes        |
| GET         | `/upcomming-appointments/:email` | Get upcoming appointments by user email                   | Yes            | No         |
| GET         | `/test-results/:email`           | Get test results by user email                            | Yes            | No         |
| GET         | `/user-appointments/:email`      | Get all appointments by user email                        | Yes            | Yes        |
| GET         | `/featured-tests`                | Get featured tests                                        | No             | No         |
| PATCH       | `/report-submit/:email/:id`      | Submit test report                                        | Yes            | Yes        |
| POST        | `/banner`                        | Add a new banner                                          | Yes            | Yes        |
| GET         | `/banner`                        | Get all banners                                           | No             | No         |
| DELETE      | `/banner/:id`                    | Delete a banner                                           | Yes            | Yes        |
| PUT         | `/banner/:id/activate`           | Activate a banner                                         | Yes            | Yes        |
| GET         | `/active-banner`                 | Get the active banner                                     | No             | No         |
| GET         | `/admin-stat`                    | Get statistical data for admin dashboard                  | Yes            | Yes        |
| GET         | `/recommendations`               | Get all recommendations                                   | No             | No         |

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [support@diagnoease.com](mailto:support@diagnoease.com).
