from operator import mod
from statistics import mode
from django.db import models
from .ProductModel import Products, ProductVarients, Images
# from django.contrib.auth.models import User

from django.conf import settings

item_status = (
        (1, 'PENDING'),
        (2, 'ORDERED'),
        (3, 'FAILED'),
    )

class Cart(models.Model):
    user  = models.CharField(max_length=50, blank=True, null=True)
    title = models.CharField(max_length=500, blank=True)
    Status = models.IntegerField(choices=item_status, default=1)
    price = models.PositiveIntegerField(blank=True, null=True)
    color = models.CharField(max_length=15, blank=True)
    size = models.PositiveIntegerField(blank=True, null=True)
    qty = models.PositiveIntegerField(blank=True, null=True)
    max_qty = models.PositiveIntegerField(blank=True, null=True)
    image = models.CharField(max_length=400, blank=True, null=True)
    

