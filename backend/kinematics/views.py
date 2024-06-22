from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import FreeFallSerializer


class FreeFallView(APIView):
    """View for the free fall model.

    Args:
        APIView (APIView): Class-based view for the free fall model.

    """

    def post(self, request: HttpRequest) -> Response:
        """Handle POST requests.

        Args:
            request (Request): Request object.

        Returns:
            Response: Response object.

        """
        serializer = FreeFallSerializer(data=request.data)
        if serializer.is_valid():
            height = serializer.validated_data["height"]
            height_unit = serializer.validated_data["height_unit"]
            velocity = serializer.validated_data["velocity"]
            velocity_unit = serializer.validated_data["velocity_unit"]
            return Response(
                {
                    "message": "Success",
                    "height": height,
                    "height_unit": height_unit,
                    "velocity": velocity,
                    "velocity_unit": velocity_unit,
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
