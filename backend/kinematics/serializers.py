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
    mass = serializers.FloatField()
    mass_unit = serializers.ChoiceField(choices=[("kg", "kg"), ("g", "g")])
    drag_coefficient = serializers.FloatField(required=False, default=0.47)
    area = serializers.FloatField(required=False, default=1)
    area_unit = serializers.ChoiceField(choices=[("m^2", "m^2"), ("cm^2", "cm^2")], required=False, default="m^2")
    density = serializers.FloatField(required=False, default=1.227)
    density_unit = serializers.ChoiceField(
        choices=[("kg/m^3", "kg/m^3"), ("g/m^3", "g/m^3")], required=False, default="kg/m^3"
    )
