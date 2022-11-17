from distutils.command.upload import upload
from email.policy import default
from pyexpat import model
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length= 300)

    def __str__(self) -> str:
        return self.title


class Sizes(models.Model):
    product_detail = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='sizes')
    choices = models.PositiveIntegerField(unique=False)

    def __str__(self):
        return str(self.choices)


class ProductVarients(models.Model):
    pro = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='varients')
    sizes = models.ManyToManyField(Sizes, blank=True)
    price = models.PositiveIntegerField(blank=True)
    discount_price = models.PositiveIntegerField(blank=True)
    discount = models.PositiveIntegerField(blank=True)
    color = models.CharField(max_length=15)
    qty = models.PositiveIntegerField(blank=True)
    

    def __str__(self) -> str:
        return f'{self.pro}_{self.color}'


class Images(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='images')
    varient = models.ForeignKey(ProductVarients, on_delete=models.CASCADE)
    images = models.FileField(upload_to='product_images/')

    def __str__(self) -> str:
        return 'image'



    


