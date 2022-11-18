
import razorpay
from .razorsetup import razor_key_id, razor_key_secret, client
from ..models import Order_Model, Cart
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..OrderSerilizers import OrderSerilizer
import json

Order_Object = None


class RazorPay(APIView):
    permission_classes = [AllowAny]

    def get(self, request, type):
        if type ==  '2':
            queryset = Order_Model.objects.filter(User=request.user).filter(Payment_Status__in=[2, 3])
        elif type =='1':
            queryset = Order_Model.objects.filter(User=request.user).filter(Payment_Status__in=[1])

        serilizer = OrderSerilizer(queryset, many=True)
        return Response(serilizer.data)
    
    def post(self, request, type):
        queryset = Order_Model.objects.filter(User=request.user).filter(Payment_Status__in=[2, 3])

        if len(queryset) == 0:
            serilizer = OrderSerilizer(data=request.data)
            if serilizer.is_valid():
                serilizer.save(User=request.user)

            data = { "amount": (serilizer.validated_data['Amount']*100), "currency": "INR", "receipt": '1'}
            razor_order = client.order.create(data=data)
            serilizer.save(razorpay_order_id=razor_order['id'])
            orderob = Order_Model.objects.filter(User=request.user).filter(Payment_Status=3).get()
            
            for i in request.data['Item']:
                item = Cart.objects.get(id=i)
                orderob.Item.add(item)
                orderob.save()

            return Response(razor_order)

        else:
            serilizer = OrderSerilizer(queryset, many=True)
            return Response(serilizer.data)


    @action(detail=True, methods=[])
    def Orders(self, request):
        return Response('getting')

    

    



@api_view(['POST'])
@permission_classes([AllowAny])
def HandlePayment(request):

        print(request.data)
        if 'error[code]' not in request.data.keys():

            print(request.data, 'kutte')

            data = {}
            for key, value in request.data.items():
                print(key, value)
                if key == 'razorpay_payment_id':
                    data['razorpay_payment_id'] = value
                elif key == 'razorpay_order_id':
                    data['razorpay_order_id'] = value
                elif key == 'razorpay_signature':
                    data['razorpay_signature'] = value


            client = razorpay.Client(auth=(razor_key_id, razor_key_secret))

            Order_Object = Order_Model.objects.get(razorpay_order_id=data['razorpay_order_id'])

            try:
                check = True
                check =client.utility.verify_payment_signature(data)
                if check:
                    Order_Object.Status = 2
                    Order_Object.Payment_Status = 1
                    Order_Object.razorpay_payment_id = data['razorpay_payment_id']
                    Order_Object.razorpay_signature = data['razorpay_signature']
                    Order_Object.save()

                    return Response(
                        {
                            "status":1,
                            "message": "Sucessfully payment done"
                        }

                    )
                else:
                    print(request.data)
                    Order_Object.Payment_Status = 2
                    Order_Object.save()
                    return Response(
                        {
                            "status":0,
                            "message": "Sucessfully payment done"
                        }

                    )
            except Exception as e:
                    print('verififed fail', e)
                    return Response(
                        {
                            "status":0,
                            "message": "Payment Verification failed"
                        }

                    )


            
        else:   

            payment_id = json.loads(request.data.get("error[metadata]")).get("payment_id")
            order_id = json.loads(request.data.get("error[metadata]")).get("order_id")
            
            Order_Object = Order_Model.objects.get(razorpay_order_id=order_id)
            Order_Object.Payment_Status = 2
            Order_Object.razorpay_payment_id = payment_id

            Order_Object.save()

            return Response(
                        {
                            "status":0,
                            "message": request.POST
                        }

                    )
                
        



