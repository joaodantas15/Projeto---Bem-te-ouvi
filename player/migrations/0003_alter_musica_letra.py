# Generated by Django 5.2.4 on 2025-07-23 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("player", "0002_playlist"),
    ]

    operations = [
        migrations.AlterField(
            model_name="musica",
            name="letra",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
