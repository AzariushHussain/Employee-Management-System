# Generated by Django 5.0 on 2023-12-23 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_department_employee_salary_employee_department_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='image',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]
