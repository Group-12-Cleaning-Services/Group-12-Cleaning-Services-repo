# Generated by Django 4.2.9 on 2024-07-15 16:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_rename_organization_name_accountuser_full_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicine',
            name='doctor',
        ),
    ]
