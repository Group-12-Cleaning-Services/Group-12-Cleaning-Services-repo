# Generated by Django 4.2.9 on 2024-07-18 15:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_medicine_doctor'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='Description',
            new_name='description',
        ),
        migrations.RenameField(
            model_name='category',
            old_name='Name',
            new_name='name',
        ),
    ]