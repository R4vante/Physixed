from django.http import HttpRequest
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from kinematics.pytools.air_res import AirResFall
from kinematics.pytools.base_fall import BaseFall
from kinematics.pytools.free_fall import FreeFall
from kinematics.pytools.lineplot import make_plot
from kinematics.serializers import AirResistanceSerializer, FreeFallSerializer


def unpack_air_res_data(data: dict) -> dict:
    """Unpack the data dictionary.

    Args:
        data (dict): Dictionary containing the data.

    Returns:
        dict: Unpacked data dictionary.

    """
    return {
        "initial_height": (data["height"], data["height_unit"]),
        "initial_velocity": (data["velocity"], data["velocity_unit"]),
        "mass": (data["mass"], data["mass_unit"]),
        "drag_coefficient": (data["drag_coefficient"],),
        "area": (data["area"], data["area_unit"]),
        "rho": (data["density"], data["density_unit"]),
    }


def create_plots(data: dict, fall_model: type[BaseFall]) -> tuple:
    """Create the plots for the model.

    Args:
        data (dict): Dictionary containing the data.
        fall_model (BaseFall): Model object.

    Returns:
        tuple: Tuple containing the height and velocity plots.

    """
    model = fall_model(**data)
    results = model.solve_eq()
    height_dict = make_plot(results["time"], results["height"])
    velocity_dict = make_plot(results["time"], results["velocity"])
    return height_dict, velocity_dict


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

            ff_model = FreeFall(initial_height=(height, height_unit), initial_velocity=(velocity, velocity_unit))

            results = ff_model.solve_eq()
            height_dict = make_plot(results["time"], results["height"])
            velocity_dict = make_plot(results["time"], results["velocity"])
            return Response(
                {"message": "Success", "height_dict": height_dict, "velocity_dict": velocity_dict},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AirResistanceView(APIView):
    """View for the air resistance model.

    Args:
        APIView (APIView): Class-based view for the air resistance model.

    """

    def post(self, request: HttpRequest) -> Response:
        """Handle POST requests.

        Args:
            request (Request): Request object.

        Returns:
            Response: Response object.

        """
        serializer = AirResistanceSerializer(data=request.data)
        if serializer.is_valid():
            data = unpack_air_res_data(serializer.validated_data)

            height_dict, velocity_dict = create_plots(data, AirResFall)

            return Response(
                {"message": "Success", "height_dict": height_dict, "velocity_dict": velocity_dict},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
