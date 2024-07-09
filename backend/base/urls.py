from django.urls import path

from base import config
from base.views import ContactView

app_name = config.APP_SLUG

urlpatterns = [
    path("contact/", ContactView.as_view(), name="contact"),
]
