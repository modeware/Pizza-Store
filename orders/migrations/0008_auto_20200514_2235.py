# Generated by Django 3.0.5 on 2020-05-14 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_cart_toppings'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='toppings',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AddField(
            model_name='orders',
            name='type',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]
