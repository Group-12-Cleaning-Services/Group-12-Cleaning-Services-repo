from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.senders.accounts import *
from core.senders.services import *
from core.retrievers.accounts import *
from core.retrievers.services import *
from core.models import Transaction
import requests
from core.utils import *
import json
import os


class PaymentViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def initialize_transaction(self, request):
        
        """
            !/bin/sh
            url="https://api.paystack.co/transaction/initialize"
            authorization="Authorization: Bearer YOUR_SECRET_KEY"
            content_type="Content-Type: application/json"
            data='{ 
            "email": "customer@email.com", 
            "amount": "20000"
            }'

            curl "$url" -H "$authorization" -H #"$content_type" -d "$data" -X POST
            
            response = {
            "status": true,
            "message": "Authorization URL created",
            "data": {
                "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
                "access_code": "0peioxfhpn",
                "reference": "7PVGX8MEk85tgeEpVDtD"
            }
            }
        """
        SECRET_KEY = os.getenv("PAYSTACK_SECRET_KEY")
        service_id = request.data.get('service_id')
        user = get_user_from_jwttoken(request)
        time = request.data.get('time')

        url="https://api.paystack.co/transaction/initialize"
        
        if user is None or service_id is None:
            context = {
                "error": "user and service id is required"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        email = user.email 
        service = get_service_by_id(service_id)
        if service:
            data = {
                "email": email,
                "amount": str(service.price) * 10,
                "currency": 'GHS'
            }
            headers = {
            "Authorization": f"Bearer {SECRET_KEY}",
            "Content-Type": "application/json"
            }
            response = requests.post(url, headers=headers, json=data)
            if response.status_code == 200:
                data = response.json()
                return Response(data, status=response.status_code)
            else:
                return Response(response.text, status=response.status_code)
        return Response({"error": "service not found"}, status=status.HTTP_404_NOT_FOUND)
            
    
    def verify_transaction(self, request)-> Response:
        """ endpoint to verify transaction

        Args:
            request (http request): http request object
            Return (http response): http response object
        """
        
        """
            {
            "status": true,
            "message": "Verification successful",
            "data": {
                "id": 2009945086,
                "domain": "test",
                "status": "success",
                "reference": "rd0bz6z2wu",
                "amount": 20000,
                "message": null,
                "gateway_response": "Successful",
                "paid_at": "2022-08-09T14:21:32.000Z",
                "created_at": "2022-08-09T14:20:57.000Z",
                "channel": "card",
                "currency": "NGN",
                "ip_address": "100.64.11.35",
                "metadata": "",
                "log": {
                "start_time": 1660054888,
                "time_spent": 4,
                "attempts": 1,
                "errors": 0,
                "success": true,
                "mobile": false,
                "input": [],
                "history": [
                    {
                    "type": "action",
                    "message": "Attempted to pay with card",
                    "time": 3
                    },
                    {
                    "type": "success",
                    "message": "Successfully paid with card",
                    "time": 4
                    }
                ]
                },
                "fees": 100,
                "fees_split": null,
                "authorization": {
                "authorization_code": "AUTH_ahisucjkru",
                "bin": "408408",
                "last4": "4081",
                "exp_month": "12",
                "exp_year": "2030",
                "channel": "card",
                "card_type": "visa ",
                "bank": "TEST BANK",
                "country_code": "NG",
                "brand": "visa",
                "reusable": true,
                "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
                "account_name": null
                },
                "customer": {
                "id": 89929267,
                "first_name": null,
                "last_name": null,
                "email": "hello@email.com",
                "customer_code": "CUS_i5yosncbl8h2kvc",
                "phone": null,
                "metadata": null,
                "risk_action": "default",
                "international_format_phone": null
                },
                "plan": null,
                "split": {},
                "order_id": null,
                "paidAt": "2022-08-09T14:21:32.000Z",
                "createdAt": "2022-08-09T14:20:57.000Z",
                "requested_amount": 20000,
                "pos_transaction_data": null,
                "source": null,
                "fees_breakdown": null,
                "transaction_date": "2022-08-09T14:20:57.000Z",
                "plan_object": {},
                "subaccount": {}
            }
            }

        """
        SECRET_KEY = os.getenv("PAYSTACK_SECRET_KEY")
        user = get_user_from_jwttoken(request)
        service_id = request.data.get('service_id')
        time = request.data.get('time')
        reference = request.data.get('reference')


        if not user or not service_id:
            context = {
                "error": "user and service id is required"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        if not user:
            context = {
                "error": "user is required"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        if not reference:
            context = {
                "error": "reference is required"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        url = f"https://api.paystack.co/transaction/verify/{reference}"
        
        headers = {
            "Authorization": f"Bearer {SECRET_KEY}",
            "Content-Type": "application/json"
            }
        
        response = requests.get(url, headers=headers)
        print(response.json())
        
        
        if response.status_code == 200:
            response = response.json()
            if response["data"]["status"] == "success":
                service = get_service_by_id(service_id)
                schedule_service = book_service(service=service, user=user, time=time)
                Transaction.objects.create(user=user, amount=service.price)
                context = {
                    "detail": "Service booked successfully",
                    "data": schedule_service
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {
                    "detail": "Transaction failed"
                }
                return Response(context, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(response.text, status=response.status_code)