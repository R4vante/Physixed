from unittest.mock import MagicMock, patch

from rest_framework.test import APIRequestFactory

from base.views import ContactView


class TestViewsHappy:
    """Happy path testing for views.

    Methods
        test_contact_view: Test the contact view api.

    """

    @patch("base.views.email_resend")
    def test_contact_view(self, mock_email_resend: MagicMock) -> None:
        """Test the contact view api."""
        payload = {
            "name": "John Doe",
            "email": "test@test.com",
            "message": "Test message",
        }

        rf = APIRequestFactory()
        request = rf.post("/contact/", payload, format="json")

        view = ContactView.as_view()
        response = view(request)
        assert response.status_code == 200
        mock_email_resend.assert_called_once_with(payload)


class TestViewsSad:
    """Sad path testing for views.

    Methods
        test_contact_view: Test the contact view api.

    """

    def test_contact_view(self) -> None:
        """Test the contact view api."""
        payload = {
            "name": "John Doe",
            "email": "invalid",
            "message": "Test message",
        }

        rf = APIRequestFactory()
        request = rf.post("/contact/", payload, format="json")

        view = ContactView.as_view()
        response = view(request)
        assert response.status_code == 400
