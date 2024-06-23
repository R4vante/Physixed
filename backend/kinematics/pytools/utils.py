import numpy as np
import pint
from base.pytools.exceptions import NegativeValueError
from base.pytools.utils import value_parse_unit


class FreeFall:
    """Physical model to simulate free fall motion."""

    def __init__(
        self, initial_height: tuple, initial_velocity: tuple, time_discretization_step: tuple | None = (0.01, "s")
    ):
        self.initial_height = initial_height
        self.initial_velocity = value_parse_unit(initial_velocity)
        self.time_discretization_step = value_parse_unit(time_discretization_step)
        self.g = value_parse_unit((9.81, "m/s**2"))

    @property
    def initial_height(self) -> pint.Quantity:
        """Create private height attribute."""
        return self._initial_height

    @initial_height.setter
    def initial_height(self, value: tuple) -> None:
        """Initialize height setter.

        Args:
            value (tuple): tuple of height value and unit

        Raises:
            NegativeValueError: if height value is smaller than 0

        """
        if value[0] < 0:
            raise NegativeValueError("Height cannot be smaller than 0.")
        self._initial_height = value_parse_unit(value)

    def solve_endtime(self) -> pint.Quantity:
        """Calculate time till object hits the ground.

        Returns
            pint.Quantity: time till the object hits the ground.

        """
        return -self.initial_velocity / self.g + np.sqrt(
            self.initial_velocity**2 / self.g**2 + 2 * self.initial_height / self.g
        )

    def solve_eq(self) -> dict:
        """Calculate the height and velocity for every time step.

        Returns
            dict: resulting values for height, velocity and time for every time step.

        """
        end_time = self.solve_endtime()
        time = value_parse_unit((np.arange(0, end_time.magnitude, self.time_discretization_step.magnitude), "s"))
        height = self.initial_height - self.initial_velocity * time - 0.5 * self.g * time**2
        velocity = self.initial_velocity + self.g * time

        return {"height": height, "velocity": velocity, "time": time}
