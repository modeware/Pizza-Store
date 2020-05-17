from django.http import HttpResponse,JsonResponse,HttpResponseRedirect
from django.shortcuts import render
from django.core import serializers
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
import json

from django.core.mail import send_mail
from django.conf import settings

from .models import RegularPizza, Category, SicilianPizza, Toppings, Subs, Pasta, Salads, DinnerPlatters,User, Cart,Orders
# Create your views here.

def home(request):
    if not request.user.is_authenticated:
        return render(request,"pizza/login.html")
    else:
        return HttpResponseRedirect(reverse("index"))

def register_view(request):
    if not request.user.is_authenticated:
        return render(request,"pizza/register.html")
    else:
        return HttpResponseRedirect(reverse("index"))



def index(request):
    if not request.user.is_authenticated:
        return render(request, "pizza/login.html", {"message": None})

    category=Category.objects.all()
    print(category)
    context = {
        "user": request.user,
        "category":category

    }
    return render(request,"pizza/index.html",context)

def orders_view(request):

    orders=Orders.objects.all()
    print(orders)
    context = {
            "user": request.user,
            "category":orders

        }
    if not request.user.is_authenticated:
        return render(request, "pizza/login.html", {"message": None})

    if not request.user=="saf":

        return render(request,"pizza/orders.html",context)
    else:
        return HttpResponse("Sorry Wrong URL")


def menu(request,menu_name):
    if request.method== 'GET':
        print(menu_name)
        if menu_name =="Regular Pizza":
            data=returnMenu(RegularPizza)

        elif menu_name =="Sicilian Pizza":
            data=returnMenu(SicilianPizza)
    
        elif menu_name =="Toppings":
            data=returnMenu(Toppings)
    
        elif menu_name =="Subs":
            data=returnMenu(Subs)
        
        elif menu_name =="Pasta":
            data=returnMenu(Pasta)
        
        elif menu_name =="Salads":
            data=returnMenu(Salads)
        
        elif menu_name =="Dinner Platters":
            data=returnMenu(DinnerPlatters)


    return JsonResponse({"pizza":data,"menu_name":menu_name})


def returnMenu(menu):
        regular_pizza=menu.objects.all()
        data = serializers.serialize('json', regular_pizza)
        return data


def register(request):
    email=request.POST.get("email")
    password=request.POST.get("password")
    firstname=request.POST.get("firstname")
    lastname=request.POST.get("lastname")
    username=request.POST.get("username")
    print(username)
    user = User.objects.create_user(username=username, email=email, password=password)
    user.first_name=firstname
    user.last_name=lastname
    user.save()
    return HttpResponseRedirect(reverse("login"))


def login_user(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "pizza/login.html", {"message": "Invalid credentials."})



def logout_view(request):
    logout(request)
    return render(request, "pizza/login.html", {"message": "Logged out."})


def addtocart(request):
    x=(request.body)
    myDict =json.loads(x)
    mylist=(list(myDict))
    print(mylist,request.user)
    username=request.user
    Cart.objects.filter(username=username).delete()
    tempItem=""
    for item in mylist:
        if item.get('topping')==None:
            tempItem=None
        else:
            tempItem=item['topping']
        c= Cart(username=username,main=item['main'],item=item['item'], type=item['type'],price=item['price'],qty=item['qty'],toppings=tempItem)
        c.save()
    cartdata=Cart.objects.all()
    cartdata=serializers.serialize('json', cartdata)
    return JsonResponse({'data':cartdata})



def getCartData(request):
    cartdata=Cart.objects.filter(username=request.user)
    cartdata=serializers.serialize('json', cartdata)
    return JsonResponse({'data':cartdata})


def email_send(request):
    x=(request.body)
    myDict =json.loads(x)
    mylist=(list(myDict))
    print(mylist,request.user)
    username=request.user
    Cart.objects.filter(username=username).delete()
    tempItem=""
    for item in mylist:
        if item.get('topping')==None:
            tempItem=None
        else:
            tempItem=item['topping']
        c= Orders(category=item['main'], size=item['type'],price=item['price'],quantity=item['qty'],toppings=tempItem,type=item['item'],user_id=username)
        c.save()
    user=User.objects.get(username=request.user)
    email=user.email
    send_mail('Order Sucessfull',
    "Order Sucessful",
    settings.EMAIL_HOST_USER,
    [email],
    fail_silently=False,)
    return HttpResponse('hello')