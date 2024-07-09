from django.urls import resolve, reverse

from base import config, views


def test_contact_url() -> None:
    """Test if contact view resolves in the correct url."""
    resolved_func = resolve(reverse(f"{config.APP_SLUG}:contact")).func

    assert resolved_func.view_class == views.ContactView
