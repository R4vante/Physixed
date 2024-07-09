from django.apps import AppConfig

APP_SLUG = "base"


class BaseConfig(AppConfig):
    """Configure the application."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "base"
