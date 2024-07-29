import numpy as np
import pint
from numpy.typing import NDArray

from base.pytools.utils import value_parse_unit
from kinematics.pytools.base_fall import BaseFall


class FreeFall(BaseFall):
    """Physical model to simulate free fall motion."""

    def solve_endtime(self) -> pint.Quantity:
        """Calculate time till object hits the ground.

        Returns
            pint.Quantity: time till the object hits the ground.

        """
        return -self._initial_velocity.to_base_units() / self.g + np.sqrt(
            self._initial_velocity.to_base_units() ** 2 / self.g**2 + 2 * self._initial_height.to_base_units() / self.g
        )

    def solve_eq(self) -> dict:
        """Calculate the height and velocity for every time step.

        Returns
            dict: resulting values for height, velocity, and time for every time step.

        """
        end_time = self.solve_endtime()
        time_steps, heights, velocities = self.initialize_simulation()

        current_time = 0
        current_height = self._initial_height.to_base_units().magnitude
        current_velocity = self._initial_velocity.to_base_units().magnitude

        while current_height > 1e-6:
            _next_time_step, next_time, next_height, next_velocity = self.calculate_next_step(
                current_time, current_height, current_velocity, end_time
            )

            time_steps.append(next_time)
            heights.append(next_height)
            velocities.append(next_velocity)

            current_time, current_height, current_velocity = self.update_state(next_time, next_height, next_velocity)
            # print(current_height)

        return self.convert_to_pint_quantities(time_steps, heights, velocities)

    def initialize_simulation(self) -> tuple:
        """Initialize the simulation lists."""
        time_steps = [0]
        heights = [self._initial_height.to_base_units().magnitude]
        velocities = [self._initial_velocity.to_base_units().magnitude]
        return time_steps, heights, velocities

    def calculate_next_step(
        self, current_time: float, current_height: float, current_velocity: float, end_time: pint.Quantity
    ) -> tuple:
        """Calculate the next time step, time, height, and velocity."""
        self.new_time_step = self.calculate_next_time_step(current_time, end_time)
        self.new_time = current_time + self.new_time_step

        self.new_height = self.calculate_next_height(current_height, current_velocity, self.new_time_step)
        self.new_velocity = current_velocity + self.g.magnitude * self.new_time_step

        next_time_step, next_time, next_height, next_velocity = self.check_convergence(
            current_height, current_velocity, current_time, self.new_height
        )

        return next_time_step, next_time, next_height, next_velocity

    def update_state(self, next_time: float, next_height: float, next_velocity: float) -> tuple:
        """Update the current state of the simulation."""
        return next_time, next_height, next_velocity

    def convert_to_pint_quantities(
        self, time_steps: NDArray | list, heights: NDArray | list, velocities: NDArray | list
    ) -> dict:
        """Convert lists to pint quantities.

        Args:
            time_steps (NDArray | list): Time vector
            heights (NDArray | list): Height vector
            velocities (NDArray | list): Velocity vector

        Returns:
            dict: Dictionary of pint quantities for time, height and velocity.

        """
        time = value_parse_unit((np.array(time_steps), "s"))
        height = value_parse_unit((np.array(heights), "m"))
        velocity = value_parse_unit((np.array(velocities), "m/s"))

        return {
            "height": height.to(self._initial_height.u),
            "velocity": velocity.to(self._initial_velocity.u),
            "time": time,
        }

    def calculate_next_time_step(self, current_time: float, end_time: pint.Quantity) -> float:
        """Calculate the next time step."""
        return min(self.time_discretization_step.magnitude, end_time.magnitude - current_time)

    def calculate_next_height(self, current_height: float, current_velocity: float, next_time_step: float) -> float:
        """Calculate the next height."""
        return current_height - current_velocity * next_time_step - 0.5 * self.g.magnitude * next_time_step**2

    def check_convergence(
        self, current_height: float, current_velocity: float, current_time: float, new_height: float
    ) -> tuple:
        """Check if the object has hit the ground and return the new iteration.

        Args:
            current_height (float): height of current iteration
            current_velocity (float): velocity of current iteration
            current_time (float): time of current iteration
            new_height (float): height of the next iteration

        Returns:
            tuple: time step, time, height and velocity of the next iteration.

        """
        if new_height <= 1e-6:
            next_time_step = (
                -current_velocity + np.sqrt(current_velocity**2 + 2 * self.g.magnitude * current_height)
            ) / self.g.magnitude
            next_time = current_time + next_time_step
            next_height = 0
            next_velocity = current_velocity + self.g.magnitude * next_time_step

            return next_time_step, next_time, next_height, next_velocity
        return self.new_time_step, self.new_time, self.new_height, self.new_velocity
