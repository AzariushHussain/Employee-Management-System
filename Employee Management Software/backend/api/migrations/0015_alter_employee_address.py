# Generated by Django 5.0 on 2023-12-27 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_employee_dateofjoining'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='address',
            field=models.CharField(max_length=500, null=True),
        ),
    ]