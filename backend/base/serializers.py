from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    """Serializer for the contact form.

    Args:
        serializers (Serializer): Serializer class for the contact form.

    """

    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()
