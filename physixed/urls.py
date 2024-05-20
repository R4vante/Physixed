"""
URL Configuration.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from dotenv import dotenv_values

try:
    from .px_production_apps import baseline_apps, production_apps
except ImportError:
    assert False, "CRITICAL: Can't import `px_production_apps.py`"

try:
    if settings.DEBUG or settings.DJANGO_UNITTESTING:
        from .px_development_apps import development_apps
except ImportError:
    print("Can't import `px_development_apps.py`. Using the production_app dict instead.")
    development_apps = production_apps.copy()

admin.site.site_header = "Datamore Administration Page"

sign_in_url = settings.LOGIN_URL
if sign_in_url.startswith("/"):
    sign_in_url = sign_in_url[1:]


oauthsettings = {k.replace("oauth__", ""): v for k, v in dotenv_values(dotenv_path=".env").items()}


urlpatterns = [
    path("admin/", admin.site.urls),
    # May 2020: https://docs.microsoft.com/en-us/graph/tutorials/python?tutorial-step=3
    # NOTE: this must match
    # TODO: pull this endpoint out of the yaml/.env file instead. Change it in 1 place only
    # Currently it is: https://____.com/microsoft-auth/callback
]

# Django debug toolbar:
if settings.DEBUG:
    urlpatterns += (path("__debug__/", include("debug_toolbar.urls")),)


def update_urlpatterns(mount_point: str, app_directory: str, urlpatterns: list) -> None:
    """Returns a path object to add to the `urlpatterns`.

    Parameters
    ----------
    mount_point : str
        Where the app is mounted in the root of the project.

    app_directory: str
        The name of the directory, in the Datamore project.

    """
    # This handles all regular cases, and the special case for "basic.apps.BasicCommonConfig"
    directory_base = app_directory.split(".")[0]
    if mount_point is not None:
        if mount_point.startswith("/"):
            mount_point = mount_point[1:]
        if not (mount_point.endswith("/")) and len(mount_point) > 0:
            mount_point += "/"
        urlpatterns.append(
            path(
                mount_point,
                include(
                    f"{directory_base!s}.urls",
                ),
            )
        )


for app_directory, val in baseline_apps.items():
    update_urlpatterns(str(val["mount_point"]), app_directory, urlpatterns)

if settings.DEBUG or settings.DJANGO_UNITTESTING:
    # We are on development/debug mode, or we are running unit tests.
    for app_directory, val in development_apps.items():
        update_urlpatterns(str(val["mount_point"]), app_directory, urlpatterns)

else:
    # We are on production!
    for app_directory, val in production_apps.items():
        update_urlpatterns(str(val["mount_point"]), app_directory, urlpatterns)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT, show_indexes=True)
