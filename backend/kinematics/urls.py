from django.urls import path

from . import views

urlpatterns = [
    path("freefall/", views.FreeFallView.as_view(), name="free-fall"),
]
