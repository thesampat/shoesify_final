# Generated by Django 4.1.3 on 2022-11-17 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoesifyapp', '0007_carousel_carouseldisplay'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carouseldisplay',
            name='parent',
        ),
        migrations.AddField(
            model_name='carouseldisplay',
            name='title',
            field=models.TextField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Carousel',
        ),
    ]
