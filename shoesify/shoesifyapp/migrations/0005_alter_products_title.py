# Generated by Django 4.1.3 on 2022-11-14 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoesifyapp', '0004_cart_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='title',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
