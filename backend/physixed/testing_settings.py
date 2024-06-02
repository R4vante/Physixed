import os
from pathlib import Path

# Import regular settings
BASE_DIR = Path(__file__)
try:
    # This is required, so that all other settings from the main settings.py are imported
    from .settings import *  # noqa: F403
except ImportError as e:
    msg = f"Cannot import settings.py: {e}?"
    raise AssertionError(msg) from e


DJANGO_UNITTESTING = bool(int(str(os.getenv("DJANGO_UNITTESTING"))))
