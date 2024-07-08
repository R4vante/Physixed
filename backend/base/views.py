from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .pytools.utils import email_resend
from .serializers import ContactSerializer


class ContactView(APIView):
    """Contact view api.

    Args:
        APIView (APIView): Django rest framework APIView.

    Methods:
        post: Post method for the view.

    """

    def post(self, request: HttpRequest) -> Response:
        """Post method for to handle the contact form.

        Args:
            request (HttpRequest): HttpRequest object.

        Returns:
            Response: Data send back to the client.

        """

        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            data = email_resend(serializer.validated_data)
            return Response(
                data,
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
