from django.contrib import admin
from .models.ProductModel import Products, ProductVarients, Sizes, Images
from .models.CartModel import Cart
from .models import  CarouselDisplay
from django.contrib.auth.admin import UserAdmin
from .models.ordersModel import Order_Model

# Register your models here.

class VarInline(admin.TabularInline):
    model = ProductVarients
    extra = 1

class SizeInline(admin.TabularInline):
    model = Sizes
    extra = 1

class ImgInline(admin.TabularInline):
    model = Images
    extra = 1

admin.site.register(CarouselDisplay)



class productsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Products._meta.fields if field.name != "id"]
    inlines = [VarInline, ImgInline ,SizeInline]


admin.site.register(Products, productsAdmin)



class cartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'title','color', 'size', 'price', 'qty', 'Status']
    readonly_fields = ['max_qty']
    

admin.site.register(Cart, cartAdmin)


class orderAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in Order_Model._meta.fields if field.name != "id"]


admin.site.register(Order_Model, orderAdmin)

