from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("menu/<str:menu_name>",views.menu,name="menu"),
    path("register",views.register,name="register"),
    path("index",views.index,name="index"),
    path("login",views.login_user,name="login"),
    path("logout", views.logout_view, name="logout"),
    path("registerview", views.register_view, name="registerview"),
    path("addtocart",views.addtocart,name="addtocart"),
    path("getCartData",views.getCartData,name="getCartData"),
    path("email_send",views.email_send,name="email_send"),
    path("orders_view",views.orders_view,name="orders_view"),

]
