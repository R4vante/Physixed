from rest_framework import serializers


class FreeFallSerializer(serializers.Serializer):
    """Serializer for the free fall model.

    Args:
        serializers (Serializer): Serializer class for the free fall model.

    """

    height = serializers.FloatField()
    height_unit = serializers.ChoiceField(choices=[("m", "m"), ("km", "km")])
    velocity = serializers.FloatField()
    velocity_unit = serializers.ChoiceField(choices=[("m/s", "m/s"), ("km/h", "km/h")])


class AirResistanceSerializer(serializers.Serializer):
    """Serializer for the air resistance model.

    Args
        serializers (Serializers): Serializer class for the air resistance model.

    """

    height = serializers.FloatField()
    height_unit = serializers.ChoiceField(choices=[("m", "m"), ("km", "km")])
    velocity = serializers.FloatField()
    velocity_unit = serializers.ChoiceField(choices=[("m/s", "m/s"), ("km/h", "km/h")])
    drag_coefficient = serializers.FloatField()
    cross_sectional_area = serializers.FloatField()
    cross_sectional_area_unit = serializers.ChoiceField(choices=[("m^2", "m^2"), ("cm^2", "cm^2")])
    mass = serializers.FloatField()
    mass_unit = serializers.ChoiceField(choices=[("kg", "kg"), ("g", "g")])
    time = serializers.FloatField()
    time_unit = serializers.ChoiceField(choices=[("s", "s"), ("min", "min")])
