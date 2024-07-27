import numpy as np
import pint

from base.pytools.utils import value_parse_unit
from kinematics.pytools.base_fall import BaseFall


class FreeFall(BaseFall):
    """Physical model to simulate free fall motion."""

    def solve_endtime(self) -> pint.Quantity:
        """Calculate time till object hits the ground.

        Returns
            pint.Quantity: time till the object hits the ground.

        """
        return -self.initial_velocity.to_base_units() / self.g + np.sqrt(
            self.initial_velocity.to_base_units() ** 2 / self.g**2 + 2 * self.initial_height.to_base_units() / self.g
        )

    def solve_eq(self) -> dict:
        """Calculate the height and velocity for every time step.

        Returns
            dict: resulting values for height, velocity and time for every time step.

        """
        end_time = self.solve_endtime()
        time = value_parse_unit((np.arange(0, end_time.magnitude, self.time_discretization_step.magnitude), "s"))
        height = (
            self.initial_height.to_base_units()
            - self.initial_velocity.to_base_units() * time.to_base_units()
            - 0.5 * self.g * time**2
        )
        velocity = self.initial_velocity.to_base_units() + self.g * time.to_base_units()

        return {
            "height": height.to(self.initial_height.u),
            "velocity": velocity.to(self.initial_velocity.u),
            "time": time,
        }
