from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class RegularPizza(models.Model):
    name=models.CharField(max_length=64)
    small=models.DecimalField(max_digits=5,decimal_places=2)
    large=models.DecimalField(max_digits=5,decimal_places=2)

    def __str__(self):
        return f"{self.name} --- {self.small} --- {self.large}"


class SicilianPizza(models.Model):
    name=models.CharField(max_length=64)
    small=models.DecimalField(max_digits=5,decimal_places=2)
    large=models.DecimalField(max_digits=5,decimal_places=2)

    def __str__(self):
        return f"{self.name} --- {self.small} --- {self.large}"

class Toppings(models.Model):
    name=models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"

class Subs(models.Model):
    name=models.CharField(max_length=64)
    small=models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True)
    large=models.DecimalField(max_digits=5,decimal_places=2)

    def __str__(self):
        return f"{self.name} --- {self.small} --- {self.large}"


class Pasta(models.Model):
    name=models.CharField(max_length=64)
    price=models.DecimalField(max_digits=5,decimal_places=2)
    
    def __str__(self):
        return f"{self.name} --- {self.price}"

class Salads(models.Model):
    name=models.CharField(max_length=64)
    price=models.DecimalField(max_digits=5,decimal_places=2)
    def __str__(self):
        return f"{self.name} --- {self.price}"

class DinnerPlatters(models.Model):
    name=models.CharField(max_length=64)
    small=models.DecimalField(max_digits=5,decimal_places=2)
    large=models.DecimalField(max_digits=5,decimal_places=2)

    def __str__(self):
        return f"{self.name} --- {self.small} --- {self.large}"

class Category(models.Model):
    category=models.CharField(max_length=64)

    def __str__(self):
        return f"{self.category}"


class Orders(models.Model):
    order_id=models.IntegerField(primary_key=True)
    category=models.CharField(max_length=64)
    size=models.CharField(max_length=10)
    price=models.DecimalField(max_digits=5,decimal_places=2)
    quantity=models.IntegerField()
    toppings=models.CharField(max_length=64,null=True,blank=True)
    type=models.CharField(max_length=64,null=True,blank=True)
    user_id=models.ForeignKey(User,on_delete=models.CASCADE)
    total=models.DecimalField(max_digits=5, decimal_places=2,null=True,blank=True)


    def __str__(self):
        return f"{self.order_id} --- {self.category} --- {self.size} ---{self.type} --- {self.price} --- {self.quantity} --- {self.user_id} --- {self.toppings}"


class Cart(models.Model):
    username=models.CharField(max_length=64)
    main=models.CharField(max_length=64)
    item=models.CharField(max_length=64)
    type=models.CharField(max_length=64)
    price=models.DecimalField(max_digits=5,decimal_places=2)
    qty=models.DecimalField(max_digits=5,decimal_places=2)
    toppings=models.CharField(max_length=64,null=True,blank=True)
    total=models.DecimalField(max_digits=5, decimal_places=2,null=True,blank=True)


    def __str__(self):
        return f"{self.username} --- {self.main} --- {self.item} --- {self.type} --- {self.price} --- {self.qty} ---{self.toppings}"
