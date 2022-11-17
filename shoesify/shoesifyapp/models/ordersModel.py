from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from .CartModel import Cart


class Order_Model(models.Model):
    status_choices = (
        (1, 'Not Packed'),
        (2, 'Ready For Shipment'),
        (3, 'Shipped'),
        (1, 'Delivered'),
    )

    payment_status_choices = (
        (1, 'SUCCESS'),
        (2, 'FAILURE'),
        (3, 'PENDING'),
    )

    User = models.ForeignKey(User,  on_delete=models.CASCADE, default=1)
    Status = models.IntegerField(choices=status_choices, default=1)
    Item = models.ManyToManyField(Cart, blank=True, null=True)

    Order_id = models.IntegerField(null=True, blank=True)
    Amount = models.FloatField(null=True, blank=True)
    Payment_Status = models.IntegerField(choices=payment_status_choices, default=3)

    razorpay_order_id = models.CharField(max_length=500, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=500, null=True, blank=True)
    razorpay_signature = models.CharField(max_length=500, null=True, blank=True)