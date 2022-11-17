from django.urls import path, include
from rest_framework import routers
from .Views import ProductsViewSet, CartViewSet, SignupViewSet, verifyOtp, resetOtp, reset_password, CarouselView
from .Views.razorpay_checkout_view import Order_Model, RazorPay, HandlePayment
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'products', ProductsViewSet, basename='name')
router.register(f'Cart', CartViewSet, basename='cart')
router.register(f'SignUp', SignupViewSet, basename='signup')
router.register(f'CarouselP', CarouselView, basename='carousel')

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('pay/<str:type>', RazorPay.as_view()),  
    path('paymentHandle/', view=HandlePayment, name='paymentFromRa'),
    path('resetOtp/', view= resetOtp,name='otpSend'),
    path('verify/', view=verifyOtp, name='otpVerification'),
    path('reset_password/', view=reset_password, name='reset_password'),

]

