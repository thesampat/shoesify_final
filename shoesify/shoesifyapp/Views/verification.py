import random
from django.core.mail import send_mail
from django.conf.global_settings import EMAIL_HOST_USER
from django.contrib.auth.models import User
import requests

FACTOR_API_KEY="6019045c-332e-11ed-9c12-0200cd936042"


class OptVerification():
    def __init__(self, target):
        self.target = target
        self.otp = ''

    
    def getotp(self):
        self.otp = random.randint(10000, 90000)
        return self.otp


    def sendotp_mail(self):
        print('sending.... otp')
        mail = send_mail(
                subject = 'OneTime Otp Verification',
                message = f'Your Otp is {self.otp}',
                from_email = EMAIL_HOST_USER,
                recipient_list = [self.target]
            )

        return mail

    def sendotp_msg(self):
        localt = requests.get(f'http://2factor.in/API/V1/6019045c-332e-11ed-9c12-0200cd936042/VOICE/{self.target}/{self.otp}')
        if localt.status_code == 200:
            return 1
        else:
            return localt
        
