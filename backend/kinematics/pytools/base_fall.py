from abc import ABC, abstractmethod

import pint

from base.pytools.exceptions import InvalidTypeError, InvalidValueError
from base.pytools.utils import value_parse_unit


class BaseFall(ABC):
    """Base class for falling motion.

    Attributes
        initial_height (tuple): initial height of the object
        initial_velocity (tuple): initial velocity of the object
        time_discretization_step (tuple): time step for the simulation
        g (pint.Quantity): acceleration due to gravity

    Methods
        solve_end_time: calculate the time till an object hits the ground
        solve_eq: calculate the height and velocity for every time step

    """

    def __init__(
        self, initial_height: tuple, initial_velocity: tuple, time_discretization_step: tuple | None = (0.01, "s")
    ):
        if not isinstance(initial_height, tuple):
            raise InvalidTypeError("Initial height must be a tuple of magnitude and unit.")
        if not initial_height:
            raise InvalidTypeError("Initial height must have a value.")
        if initial_height[0] < 0:
            raise InvalidValueError("Height cannot be smaller than 0.")

        if not isinstance(initial_velocity, tuple):
            raise InvalidTypeError("Initial velocity must be a tuple of magnitude and unit.")
        if not initial_velocity:
            raise InvalidTypeError("Initial velocity must have a value.")
        if initial_velocity[0] < 0:
            raise InvalidValueError("Velocity cannot be smaller than 0.")

        self.initial_height = initial_height
        self.initial_velocity = initial_velocity
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
            InvalidValueError: if height value is smaller than 0

        """

        self._initial_height = value_parse_unit(value)

    @property
    def initial_velocity(self) -> pint.Quantity:
        """Create private velocity attribute."""
        return self._initial_velocity

    @initial_velocity.setter
    def initial_velocity(self, value: tuple) -> None:
        """Initialize velocity setter.

        Args:
            value (tuple): tuple of velocity value and unit

        Raises:
            InvalidValueError: if velocity value is smaller than 0

        """

        self._initial_velocity = value_parse_unit(value)

    @abstractmethod
    def solve_eq(self) -> dict:
        """Calculate the height and velocity for every time step.

        Returns
            dict: resulting values for height, velocity and time for every time step.

        """
