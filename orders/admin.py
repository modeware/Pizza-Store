from django.contrib import admin

# Register your models here.
from .models import RegularPizza, SicilianPizza, Toppings,Salads,Subs,DinnerPlatters,Pasta,Orders,Category,Cart

admin.site.register(RegularPizza)
admin.site.register(SicilianPizza)
admin.site.register(Toppings)
admin.site.register(Salads)
admin.site.register(Subs)
admin.site.register(Pasta)
admin.site.register(DinnerPlatters)
admin.site.register(Orders)
admin.site.register(Category)
admin.site.register(Cart)

