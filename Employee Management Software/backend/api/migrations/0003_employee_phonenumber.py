# Generated by Django 5.0 on 2023-12-23 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_employee_dataofjoining_employee_dateofjoining'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='phoneNumber',
            field=models.IntegerField(max_length=10, null=True, unique=True),
        ),
    ]
