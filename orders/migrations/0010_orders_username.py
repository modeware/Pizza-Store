# Generated by Django 3.0.5 on 2020-05-16 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_auto_20200516_1102'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='username',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
    ]