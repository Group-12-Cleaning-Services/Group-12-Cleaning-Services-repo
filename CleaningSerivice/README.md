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
### List all users
#### Request
- Method: GET
- URL: `/api/accounts/all`
#### Response
- Status: 200 OK
- Body:
  ```json
  [
    {
        "user_id": "0dd9151e-a71c-4abd-8eb6-ae3f86d19cc2",
        "email": "lord@lord.com",
        "role": null,
        "full_name": null,
        "phone": null,
        "user_image": null
    },
    {
        "user_id": "a089538c-f233-4d3c-a098-afd93d0638a9",
        "email": "yrnlehj@gmail.com",
        "role": "sales_person",
        "full_name": "alert('Hacked')",
        "phone": "+233502276474",
        "user_image": "/media/images/profile_NAiThoN.jpg"
    }
  ]
  ```
### Retrieve User
#### Request
- Method: GET
- URL: `/api/accounts/retrieve/1/`
#### Response
- Status: 200 OK
- Body:
  ```json
  {
    "user_id": "a089538c-f233-4d3c-a098-afd93d0638a9",
    "email": "yrnleh@gmail.com",
    "role": "sales_person",
    "full_name": "alert('Hacked')",
    "phone": "+233502276474",
    "user_image": "/media/images/profile_NAiThoN.jpg"
  }
```
### Update User
#### Request
- Method: POST
- URL: `/api/accounts/update/1/`
- Headers:
  - Content-Type: application/json
- Body:
  ```json
    {
        "email
        "role": "sales_person",
        "full_name": "alert('Hacked')",
        "phone": "+233502276474",
    }
  ```
#### Response
- Status: 201 Created
- Body:
  ```json
    {
        "detail": "User updated successfully"
    }
  ```
### Delete User 
- Method: DELETE
- URL: `/api/accounts/delete/1/`
### Response
- Status: 200 0K
```json
{
  "delete": "User deleted successfully"
}
```
### Login User
#### Request
- Method: POST
- URL: `/api/login/`
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
- URL: `/api/medicine/all`
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
            "manufacturer": "Ernest Chemist"

        },
        {
            "medicine_id": "4999c8e1f1bd68",
            "name": "Gebedol",
            "category": "Pain Killer",
            "price": "10.00",
            "quantity": 20,
            "description": "This is Gebedol",
            "manufacturer": "Ernest Chemist"

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
        "manufacturer": "Ernest Chemist",
        }
    }
  ```
### Update Medicine 
#### Request
- Method: POST
- URL: `/api/medicine/update/id/`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer <token>
- Body:
  ```json
    {
    "detail": "Service created successfully",
    }
  ```
### Retrive Medicine
#### Request
- Method: POST
- URL: `/api/medicine/retrieve/id/`
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer <token>
- Body:
  ```json
    {
    "detail": "Medicine retrieved successfully",
    "medicine": {
        "medicine_id": "d4e39f2d3ac3c",
        "name": "Another Services",
        "category": "laundary",
        "price": "10.00",
        "quantity": 12,
        "description": "I dont work for free",
        "manufacturer": "Ernest Chemist",
        }
    }
  ```

### Delete Medicne
#### Request
- Method POST
- URL `api/medicine/delete/id`
- Headers:
  - Content-Type: application/json
  - Authorization
#### Response
- Status: 200 OK
- Body:
  ```json
  {
    "detail": "Medicine deleted successfully"
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
      "status": true,
      "message": "Authorization URL created",
      "data": {
          "authorization_url": "https://checkout.paystack.com/2bsv97y66glcuhh",
          "access_code": "2bsv97y66glcuhh",
          "reference": "7rwajs083y"
      }
  }
```

###Retrieve Order
#### Request
- Method: GET
- URL: `/api/medicine/retrieve-order/1/`
#### Response
- Status: 200 OK
- Body:
  ```json
  {
    "detail": "Order retrieved successfully",
    "order": {
        "order_id": "3919ed46-1d95-49ed-8a99-b9db7cb93421",
        "medicine": {
            "medicine_id": "48ddec16-2a53-4f8a-8e87-53cd25f3347e",
            "name": "Gebedol",
            "category": "pain killer",
            "price": "20.00",
            "quantity": "-25.00",
            "description": "this is just para",
            "manufacturer": "Tobinco"
        },
        "quantity": "5.00",
        "status": false,
        "customer": {
            "user_id": "a06b38ea-33c0-4793-85a9-f9cf81be54e0",
            "email": "yrnleh@gmail.com",
            "role": "sales_person",
            "full_name": "alert('Hacked')",
            "phone": "+233502276474",
            "user_image": "/media/images/profile_nmpixsm.jpg"
        }
    }
}
```

### Get all user orders
#### Request
- URL: `/api/medicine/order/all/`
- Method GET
- Authentication Request
#### Response
```json
{
    "detail": "All Orders",
    "orders": [
        {
            "order_id": "3919ed46-1d95-49ed-8a99-b9db7cb93421",
            "medicine": {
                "medicine_id": "48ddec16-2a53-4f8a-8e87-53cd25f3347e",
                "name": "Gebedol",
                "category": "pain killer",
                "price": "20.00",
                "quantity": "-60.00",
                "description": "this is just para",
                "manufacturer": "Tobinco",
                "thumbnail": null
            },
            "quantity": "5.00",
            "status": false,
            "customer": {
                "user_id": "a06b38ea-33c0-4793-85a9-f9cf81be54e0",
                "email": "yrnleh@gmail.com",
                "role": "sales_person",
                "full_name": "alert('Hacked')",
                "phone": "+233502276474",
                "user_image": "/media/images/profile_nmpixsm.jpg"
            },
            "address": null
        },
        {
            "order_id": "14486795-6fad-41c1-928a-70f322b39d77",
            "medicine": {
                "medicine_id": "48ddec16-2a53-4f8a-8e87-53cd25f3347e",
                "name": "Gebedol",
                "category": "pain killer",
                "price": "20.00",
                "quantity": "-60.00",
                "description": "this is just para",
                "manufacturer": "Tobinco",
                "thumbnail": null
            },
            "quantity": "0.00",
            "status": false,
            "customer": {
                "user_id": "a06b38ea-33c0-4793-85a9-f9cf81be54e0",
                "email": "yrnleh@gmail.com",
                "role": "sales_person",
                "full_name": "alert('Hacked')",
                "phone": "+233502276474",
                "user_image": "/media/images/profile_nmpixsm.jpg"
            },
            "address": null
        },
        {
            "order_id": "40affbf1-4041-4451-85ba-5a111cd1546b",
            "medicine": {
                "medicine_id": "48ddec16-2a53-4f8a-8e87-53cd25f3347e",
                "name": "Gebedol",
                "category": "pain killer",
                "price": "20.00",
                "quantity": "-60.00",
                "description": "this is just para",
                "manufacturer": "Tobinco",
                "thumbnail": null
            },
            "quantity": "5.00",
            "status": false,
            "customer": {
                "user_id": "a06b38ea-33c0-4793-85a9-f9cf81be54e0",
                "email": "yrnleh@gmail.com",
                "role": "sales_person",
                "full_name": "alert('Hacked')",
                "phone": "+233502276474",
                "user_image": "/media/images/profile_nmpixsm.jpg"
            },
            "address": "Achimota"
        }
    ]
}
```

## Category
### Get all categories
#### Request
- Method: GET
- URL: `/api/category/all`
#### Response
- Status: 200 OK
- Body:
  ```json
  {
    "detail": "All Categories",
    "categories": [
        {
            "id": "2886bb6d-deed-40b2-93f6-68d3f8e59d7b",
            "name": "Pain Killer",
            "description": "This is a pain killer category"
        },
        {
            "id": "4999c8e1f1bd68",
            "name": "Antibiotics",
            "description": "This is an antibiotics category"
        }
    ]
    }
```
### Create a category
#### Request
- Method: POST
- URL: `/api/category/create/`
- Headers:
  - Content-Type: application/json
  - Authorization
- Body:
  ```json
        {
        "name": "",
        "description": "str"
        }
  ```
#### Response
- Status: 201 Created
- Body:
  ```json
    {
        "detail": "Category created successfully",
    }
  ```

### Category update
#### Request
- Method: POST
- URL: `/api/category/update/1/`
- Headers:
  - Content-Type: application/json
  - Authorization
- Body:
  ```json
        {
        "name": "",
        "description": "str"
        }
  ```
#### Response
- Status: 201 Created
- Body:
  ```json
    {
        "detail": "Category updated successfully",
    }
  ```

### Retrieve Category
- Method: GET
- URL: `/api/category/retreive/1/`
- Headers:
  - Content-Type: application/json
#### Response
- Status: 201 Created
- Body:
  ```json
    {
    "detail": "Category retrieved successfully",
    "category": {
        "id": 1,
        "name": "para",
        "description": "new pain killer"
    }
    }
  ```

