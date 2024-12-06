# RBAC VRV Project

## Overview
This project is a Role-Based Access Control (RBAC) system for the VRV project. It provides a secure way to manage user permissions and roles.

## Getting Started

### Prerequisites
- Node.js
- pnpm (Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/thesahirahmed/rbac-vrvproject.git
    ```
2. Navigate to the project directory:
    ```sh
    cd rbac-vrvproject
    ```
3. Install the dependencies:
    ```sh
    pnpm install
    ```

### Running the Project
To start the development server, run:
```sh
pnpm dev
```

### Admin Credentials
After starting the server, you can log in with the following admin credentials:
- **ID:** admin
- **Password:** secretkey

### Profile Page

I've created a comprehensive Profile page that includes:

#### User Information Display
- Profile picture (using the avatar generator)
- Username and role
- Email address
- Member since date

#### Edit Profile Functionality
- Toggle between view and edit modes
- Update email address
- Change password (optional)
- Form validation using Zod
- Success/error messages

#### Security Features
- Current password verification
- Password confirmation for changes
- Form validation for email and password fields

#### UI/UX Improvements
- Responsive design
- Dark mode support
- Icon integration
- Loading states
- Clear feedback messages

You can now access the profile page by clicking on the Profile link in the navigation menu. The page allows users to view their information and make updates to their profile.

### Dashboard Component

Dashboard component to show different views based on the user's role:

#### Admin Dashboard
- Shows all the statistics and user distribution
- Remains unchanged from the previous version

#### User Dashboard
- Shows the user's current status (Active/Inactive)
- Displays current role

For inactive users:
- Shows an alert about account status
- Provides a button to request activation

For active regular users:
- Shows an option to request moderator role elevation
- Shows confirmation when requests are sent

The dashboard properly handles:
- Role-based content display
- Account status visibility
- Role elevation requests
- Activation requests
- Success notifications

Users can see:
- See their current status
- Request account activation if inactive
- Request role elevation to moderator if they're a regular user
- View confirmation messages after sending requests

## Contact
For any questions or issues, please open an issue on GitHub or connect with me on [LinkedIn](https://www.linkedin.com/in/sahir-ahmed/).
