from rest_framework import serializers


class FreeFallSerializer(serializers.Serializer):
    """Serializer for the free fall model.

    Args:
        serializers (Serializer): Serializer class for the free fall model.

    """

    height = serializers.FloatField()
    height_unit = serializers.ChoiceField(choices=[("m", "m")])
    velocity = serializers.FloatField()
    velocity_unit = serializers.ChoiceField(choices=[("m/s", "m/s"), ("km/h", "km/h")])
