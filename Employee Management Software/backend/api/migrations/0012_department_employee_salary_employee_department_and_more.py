# Generated by Django 5.0 on 2023-12-23 20:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_employee_fingerprint'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='salary',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='Department',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.department'),
        ),
        migrations.DeleteModel(
            name='Attendance',
        ),
    ]
