from asyncio import constants
from tkinter import Image
from rest_framework import serializers
from .Productserilizers import ImageSerilizer, ProdvarSerilizers, ProductName
from .models import Cart, ProductVarients
import json 


class CartSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Cart
        fields = '__all__'
        read_only = ['id']