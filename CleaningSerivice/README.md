# API Description

This document provides an overview of the API for the Cleaning Services application. The API allows users to perform various operations related to cleaning services, such as creating bookings, managing appointments, and accessing service provider information.

## Account Management
### Register User
#### Request
- Method: POST
- URL: `/api/accounts/create`
- Headers:
  - Content-Type: application/json
- Body:
  ```
    {
        "password": "password123",
        "email": "",
    }
    ```
#### Response
- Status: 201 Created
- Body:
  ```
    {
        "detail": "User created successfully"
    }
    ```
### Login User
#### Request
- Method: POST
- URL: `/api/accounts/login`
- Headers:
  - Content-Type: application/json
- Body:
  ```
    {
        "password": "password123",
        "email": "",
    }
    ```
#### Response
- Status: 200 OK
```json
{
    "detail": "Sign in successful",
    "user": {
        "user_id": "f385e915f-2",
        "email": "yrn@gmail.com",
        "verified": false,
        "profile": ""
    },
    "token": {
        "access": "",
        "refresh": ""
    }
}
```
## Medicine
### Get all medicines
#### Request
- Method: GET
- URL: `/api/medicines/all`
#### Response
- Status: 200 OK
- Body:
  ```json
  {
    "detail": "All Medicines",
    "medicines": [
        {
            "medicine_id": "2886bb6d-deed-40b2-93f6-68d3f8e59d7b",
            "name": "Para",
            "category": "Pain Killer",
            "price": "12.00",
            "quantity": 10,
            "description": "This is para",
            "doctor": {
                "user_id": "f385e9b6-2c59-459a-b15f-21854a75df56",
                "email": "yrnlehjend+12@gmail.com",
            }
        },
        {
            "medicine_id": "4999c8e1f1bd68",
            "name": "Gebedol",
            "category": "Pain Killer",
            "price": "10.00",
            "quantity": 20,
            "description": "This is Gebedol",
            "doctor": {
                "user_id": "4d86abed5501",
                "email": "yrn@gmail.com",
            }
        }
    ]
    }
```
### Create a medicine
#### Request
- Method: POST
- URL: `/api/medicine/create/`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer <token>
- Body:
  ```json
  {
    "detail": "Service created successfully",
    "medicine": {
        "medicine_id": "d4e39f2d3ac3c",
        "name": "Another Services",
        "category": "laundary",
        "price": "10.00",
        "quantity": 12,
        "description": "I dont work for free",
        "doctor": {
            "user_id": "f385e9b6-2c59-459a-b15f-21854a75df56",
            "email": "yrn@gmail.com",
            "organization_name": null
        }
    }
    }
    ```

### Order a medicine
#### Request
- Method: POST
- URL: `/api/medicine/order/`
- Headers:
  - Content-Type: application/json
  - Authorization
  - Body:
  'medicine_id': 'd4e39f2d3ac3c',
  'quantity': 2,
    'total_price': 20.00,
#### Response
- Status: 200 OK
- Body:
  ```json 
  {
    "detail": "Medicine orderered successfully",
    "data": {
        "order_id": "482eb3b4-00fa-47eb-bdbb-febc52326d31",
        "medicine": {
            "medicine_id": "4999c893-e26e-4332-bb31-50a8e1f1bd68",
            "name": "Gebedol",
            "category": "Pain Killer",
            "price": "10.00",
            "quantity": "20.00",
            "description": "This is Gebedol",
            "doctor": {
                "user_id": "4d86abe8-36e2-4d4f-87f6-16502d0d5501",
                "email": "yrn@gmail.com",
                "organization_name": null
            }
        },
        "quantity": "5.00",
        "status": false,
        "customer": {
            "user_id": "f385e9b6-2c59-459a-b15f-21854a75df56",
            "email": "yrnle@gmail.com",
            "organization_name": null
        }
    }
}
```

### Get all user orders
#### Request
- Method POST
- Authentication Request
#### Response
```json
{
    "detail": "All ordered medicine",
    "services": [
        {
            "order_id": "482eb3b426d31",
            "medicine": {
                "medicine_id": "4999c893e1f1bd68",
                "name": "Gebedol",
                "category": "Pain Killer",
                "price": "10.00",
                "quantity": "20.00",
                "description": "This is Gebedol",
                "doctor": {
                    "user_id": "4d86a02d0d5501",
                    "email": "yrn@gmail.com",
                }
            },
            "quantity": "5.00",
            "status": false,
            "customer": {
                "user_id": "f385e9b6-2c59-459a-b15f-21854a75df56",
                "email": "yrn@gmail.com",
            }
        }
    ]
}
```
