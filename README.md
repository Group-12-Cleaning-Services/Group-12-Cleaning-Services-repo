# Kleen


## Overview

Brief description of your project, what it does, and its main features.

## Getting Started

### Prerequisites

- Python (version 10)
- Django (version 4.3)
- Django Rest Framework (version 3.5)
- Other dependencies...

### Installation

1. Clone the repository:

    ```bash
    git clone origin  https://@github.com/Group-12-Cleaning-Services/Group-12-Cleaning-Services-repo
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:

    ```bash
    python manage.py migrate
    ```

### Usage

1. Run the development server:

    ```bash
    python manage.py runserver
    ```

2. Access the API at [http://localhost:8000/api/](http://localhost:8000/api/)


```bash
python manage.py test
```

## Endpoints
### User Accounts
``Create Account:
 POST /accounts/create/``

- Create a new user account. Requires `email` and `password` in the request body.

```Verify Account: POST /accounts/verify-account/```

- Verify the user account by providing the email and otp (one-time PIN) in the request body.

```Resend Verification PIN: POST /accounts/resend-verification-pin/```
- Resend the verification PIN to the email associated with the account. Requires email in the request body.

### Profiles
```List Profiles: GET /profile/```

 - Retrieve a list of user profiles.

```Create Profile: POST /profile/create/```

- Create a new user profile. Requires authentication and profile data in the request body.

```Update Profile: POST /profile/update/```

- Update the user profile. Requires authentication and updated profile data in the request body.
### Authentication
```Obtain JWT Token: POST /login/```

- Obtain an authentication token by providing valid email and password in the request body.

```Refresh Token: POST /token/refresh/```

- Refresh the authentication token using a valid refresh token.

# Service Viewset

The Service Viewset provides functionality to manage various aspects of services, including listing, creating, updating, retrieving, and deleting services. It also handles booking services, canceling booked services, providing feedback, and retrieving specific service-related information.

## List All Services

### Endpoint
`GET /service/all/`

### Description
Get a list of all available services.

### Request
- Method: `GET`
- Authentication: Required

### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "All Services",
    "services": [...]
  }

## List Booked Services by Customer
### Endpoint
```GET /service/booked-user-service/{id}/```

### Description
Get a list of all services booked by a customer.

### Request
- Method: `GET`
- Authentication: Required
- URL Params: `id` The ID of the customer.
### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "All Services",
    "services": [...]
  }
  ```
## Create Service
### Endpoint
```POST /service/create/```
### Description
Create a new service.
### Request
- Method: `POST`
- Authentication: Required
- Body:
  ```json
  {
    "name",
    "description",
    "price",
    "category",
    "thumnail"
  }
  ```
### Response
- Status Code: 201 Created
- Body:
  ```json
  {
    "detail": "Service Created Successfully",
    "service": {...}
  }
  ```
## Update Service
### Endpoint
```PUT /service/update/{id}/```
### Description
Update an existing service.
### Request
- Method: `PUT`
- Authentication: Required
- URL Params: `id` The ID of the service.
- Body:
  ```json
  {
    "name",
    "description",
    "price",
    "category",
    "thumnail"
  }
  ```

### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "Service Updated Successfully",
    "service": {...}
  }
  ```

### Retrieve Service
### Endpoint
```GET /service/{id}/```
### Description
Retrieve a specific service.
### Request
- Method: `GET`
- Authentication: Required
- URL Params: `id` The ID of the service.
### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "Service Retrieved Successfully",
    "service": {...}
  }
  ```
### Delete Service
### Endpoint
```DELETE /service/delete/{id}/```
### Description
Delete a specific service.
### Request
- Method: `DELETE`
- Authentication: Required
- URL Params: `id` The ID of the service.
### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "Service Deleted Successfully",
    "service": {...}
  }
  ```
### Service Feedback
### Endpoint
```POST /service/feedback/{id}/```
### Description
Provide feedback for a specific service.
### Request
- Method: `POST`
- Authentication: Required
- URL Params: `id` The ID of the service.
- Body:
  ```json
  {
    "rating",
    "comment"
  }
  ```

### Response
- Status Code: 201 Created
- Body:
  ```json
  {
    "detail": "Feedback created Successfully",
    "feedback": {...}
  }
  ```
## Book Service
### Endpoint
```POST /service/book/```
### Description
Allows a customer to book a service after payment is made.


### Request
- Method: `POST`
- Authentication: Required
- Body:
  ```json
  {
    "serivce id",
    "time"
  }
  ```
### Response
- Status Code: 201 Created
- Body:
  ```json
  {
    "data": {
        "status": true,
        "message": "Authorization URL created",
        "data": {
          "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
          "access_code": "$$$$$",
          "reference": "###########"
        }
    } ,
  }
  ```
## Verify Payment
### Endpoint
```POST /service/verify-payment/```
### Description
Verify payment after a customer has paid for a service.
### Request
- Method: `POST`
- Authentication: Required
- Body:
  ```json
  {
    "reference",
    "time",
    "service id",
  }
  ```
### Response
- Status Code: 200 OK
- Body:
  ```json
  {
    "detail": "Service booked successfully",

    "data": {...}
  }
  ```





### Permissions
- Create, Update, Delete Service: Requires authentication.
### Notes
- Email verification is handled using one-time PIN (OTP) sent to the user's email address.
- Token-based authentication is used for securing endpoints that require user authentication.
- Services can be created, updated, and deleted by users with the "service_provider" user type.
