from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from ..models import *
from ..Productserilizers import ProductSerilisers, CarouselDisplaySerilizer
from rest_framework.response import Response
from ..CartSerilizers import Cart, CartSerilizer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..UserSerilizer import UserSerilizer
from django.conf import settings
from rest_framework.decorators import action
from django.db.models import Sum 
from django.contrib.auth.models import User
from django.contrib import sessions
from .verification import OptVerification
from rest_framework.decorators import api_view, permission_classes
import json
from sms import send_sms
import time

import environ

env = environ.Env()
environ.Env.read_env()





class ProductsViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]
    
    def list(self, request):
        queryset = Products.objects.all()
        serilizer = ProductSerilisers(queryset, many=True)
        return Response(serilizer.data)

    def retrieve(self, request, pk=None):
        queryset = Products.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ProductSerilisers(user)
        return Response(serializer.data)


class CartViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]


    def checkTotal(self):
        query = Cart.objects.filter(user=self.request.user).filter(Status=1)

        total = 0

        for i in query.values():
            total += (i['qty'] * i['price'])

        return total
    

    def list(self, request):
        queryset = Cart.objects.filter(user=self.request.user).filter(Status=1)
        serilizer = CartSerilizer(queryset, many=True)
        total = self.checkTotal()

        return Response({'data':serilizer.data, 'total':total})


    def create(self, request):
        try:
            serilizer = CartSerilizer(data=request.data)
        except:
            raise ValidationError('Field can"t be empty')

        if serilizer.is_valid(raise_exception=True):
            serilizer.save()
            self.getallqty(request, '+')

            return Response(serilizer.data)

    def get(self, request, pk, format=None):
        snippet = Cart.objects.get(pk=pk)
        serializer = CartSerilizer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = Cart.objects.get(pk=pk)

        payload = {'qty':request.data['qty']}
        
        serializer = CartSerilizer(snippet, data=payload)
        if serializer.is_valid():
            serializer.save()
            print(request.data)
            if request.data['type'] == '+':
                 print('get or not')
                 self.getallqty(request, '+')
            else:
                 self.getallqty(request, '-')
            total = self.checkTotal()
            print(total, 'total serilizer')

            return Response(total)
        return Response(serializer.errors)

    @action(detail=True, methods=['post'])
    def Status(self, request, pk):
        try:
            obj = Cart.objects.filter(user=request.user).get(pk=pk)
        except:
            Response('object not found')

        obj.Status = request.data['Status']
        obj.save()
        return Response('Chnaged')


    @action(detail=False, methods=['get'])
    def qty(self, request):
        queryset = Cart.objects.filter(user=request.user).exclude(Status=2)
        print(queryset)
        serilizer = CartSerilizer(queryset, many=True)
        qty = queryset.aggregate(Sum('qty'))
        return Response(qty)

    def getallqty(self, request, typei):
        title = request.data['title']
        qty = request.data['qty']
        color = request.data['color']

        product = Products.objects.filter(title=title).get()
        varient = product.varients.filter(color=color).get()


        if typei == '+':
            varient.qty += 1
        if typei == '-':
            varient.qty -= 1
        varient.save()
        

    def destroy(self, request, pk=None):
        cartitem = Cart.objects.filter(id=pk).get()
        product = Products.objects.filter(title=cartitem.title).get()
        varient = product.varients.filter(color=cartitem.color).get()
        varient.qty += cartitem.qty
        varient.save()

        cartitem.delete()

        # self.getallqty(request, '-')
        return Response('deleteed')


class SignupViewSet(viewsets.ViewSet):
 
    permission_classes = [AllowAny]

    def create(self, request):
        try:
            serilizer = UserSerilizer(data=request.data)
        except:
            raise ValidationError('Field can"t be empty')

        if serilizer.is_valid():
            serilizer.save()
            target = str(serilizer.validated_data['email'])

            return Response({
                'data': target,
                'verified': 1
            })
            
            
        else:
            return Response(serilizer.errors)



class CarouselView(viewsets.ViewSet):
    permission_classes = [AllowAny]
    def list(self, request):
        queryset = CarouselDisplay.objects.all()
        serilizer = CarouselDisplaySerilizer(queryset, many=True)
        return Response(serilizer.data)

    

@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    user = request.data['user']
    reset_password = request.data['password']
    U = User.objects.filter(email=user).get()
    U.set_password(reset_password)
    U.save()
    return Response({
        'message': "password reset successfully"
    })



@api_view(['POST'])
@permission_classes([AllowAny])
def verifyOtp(request):  
    print(request.session.keys(), '----------', request.session)
    try:
        token = request.session[request.data['target']]

    except KeyError as e:
        print(request.session.keys())
        # print(request.session[8618881769], 'chcekkk-------')
        return Response(
            {"status": 0,
            "message": 'otp expired please request new one'
            }
        )

    if token == request.data['token']:
        user = User.objects.filter(email=request.data['target']).get()
        if user.is_active == False:
            user.is_active = True
            user.save()
        return Response(
             {"status": 1,
            "message": 'otp verified successfully'
            }
        )
    else:
        return Response(
             {"status": -1,
            "message": 'invalid otp'
            }
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def resetOtp(request):
    target = request.data['target']
    data= sendOtp(request, target)
    return Response(data)



def sendOtp(request, target):
    otpvar = OptVerification(target)
    token = otpvar.getotp()
    request.session[target] = token
 
    print(request.session.keys(),'----------',request.session)

    if str(target).find('@') != -1:
        mail = otpvar.sendotp_mail()
        data = {
            'data': target,
            'status': mail,
            'token' : token}
        request.session.set_expiry(300)
        return data

    else:
        res = otpvar.sendotp_msg()
        print(res)
        data = {
            'data': target,
            'status': res,
            'token': token
        }
        request.session.set_expiry(300)
        
        return data


