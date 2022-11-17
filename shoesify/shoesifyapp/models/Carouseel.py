from django.db import models

class CarouselDisplay(models.Model):
    title = models.TextField(max_length=100)
    image = models.FileField(upload_to='carousel_images/')
