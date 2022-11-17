# Generated by Django 4.1.3 on 2022-11-17 08:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoesifyapp', '0006_cart_max_qty'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carousel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='CarouselDisplay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='carousel_images/')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shoesifyapp.carousel')),
            ],
        ),
    ]