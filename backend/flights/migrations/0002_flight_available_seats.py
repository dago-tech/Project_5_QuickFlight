# Generated by Django 5.0 on 2023-12-15 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='flight',
            name='available_seats',
            field=models.IntegerField(default=100),
        ),
    ]
