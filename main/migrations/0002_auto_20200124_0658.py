# Generated by Django 2.2.7 on 2020-01-24 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bus',
            name='route',
            field=models.CharField(default='Через город', max_length=100),
        ),
        migrations.AddField(
            model_name='bus',
            name='type',
            field=models.CharField(default='city', max_length=100),
        ),
    ]
