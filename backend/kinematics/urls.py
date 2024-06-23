from django.urls import path

from . import views

urlpatterns = [
    path("api/freefall/", views.FreeFallView.as_view(), name="free-fall"),
]
