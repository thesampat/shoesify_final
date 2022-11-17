from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import validate_email
import re
from django.contrib.auth.hashers import make_password


class UserSerilizer(ModelSerializer):
    email = serializers.CharField(max_length=200)

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], email= validated_data['email'], password=make_password(validated_data['password']))
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.is_active = False
        user.save()
        return user

   
    def validate_email(self, value):
        regex = r'[^@]+@[^@]+\.[^@]+'

        isemail = str(value).find('@')
      
        if isemail != -1:  
            try:
                validate_email(value)
            except:
                raise serializers.ValidationError('invalid email address')
            else:
                res = User.objects.filter(email=value)
                if len(res) >= 1:
                    raise serializers.ValidationError('Email already exists')
                else:
                    return value

        else:
            regex = r'(?<!\d)(?=\d{10}(?!\d))((11|351|2267|)(\d+))'
            if re.match(regex, value):
                return value
            else:
                raise serializers.ValidationError('invalid phone number')



    def validate(self, data):
        if not (data['first_name'].isalpha()) or not (data['last_name'].isalpha()):
            raise serializers.ValidationError('demographic names can only consists letter')
        return data




