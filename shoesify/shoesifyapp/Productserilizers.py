from asyncore import read
from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from .models import * 

class ImageSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Images
        exclude = ['product']
        

class SizeSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Sizes
        fields =  ['choices']

class ProductName(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['title', 'description']

class ProdvarSerilizers(serializers.ModelSerializer):
    sizes = SizeSerilizer(many=True)
    class Meta:
        model = ProductVarients
        fields = '__all__'
        read_only = ['id']

class ProductSerilisers(serializers.ModelSerializer):
    varients = ProdvarSerilizers(read_only=True, many=True)
    sizes = SizeSerilizer(many=True)
    images = ImageSerilizer(read_only=True, many=True)

    class Meta:
        model = Products
        fields = ['pk','title', 'description', 'sizes', 'varients', 'images']

class CarouselDisplaySerilizer(serializers.ModelSerializer):
    class Meta:
        model = CarouselDisplay
        fields = '__all__'



