"""Configuration for the application."""

from zoneinfo import ZoneInfo

from .apps import APP_SLUG as _APP_SLUG


class Config:
    """Configuration for the application."""

    APP_SLUG: str = _APP_SLUG
    responsible_person: str = "Leroy Teegelbeckers"
    responsible_person_email: str = "multiduckk@gmail.com"
    year: str = "2024"
    default_timzone: ZoneInfo = ZoneInfo("Europe/Amsterdam")


config = Config()
