from rest_framework import serializers
from .models.ordersModel import Order_Model
from .CartSerilizers import CartSerilizer

class OrderSerilizer(serializers.ModelSerializer):
    Item = CartSerilizer(many=True, read_only=True)
    class Meta:
        model = Order_Model
        fields = '__all__'
