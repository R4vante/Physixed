from collections.abc import Callable

import numpy as np
from numpy.typing import NDArray
from scipy.integrate import solve_ivp

from base.pytools.utils import value_parse_unit
from kinematics.pytools.base_fall import BaseFall


def event_decorator(terminal: bool, direction: int) -> Callable:
    """Set evenfunction for solve_ivp.

    Args:
        terminal (bool): set the termination state
        direction: set the direction of convergence

    Returns:
        decorator function

    """

    def decorator(func: Callable) -> Callable:
        # mypy thinks setting the attribute is an error. See: https://github.com/scipy/scipy/issues/18041
        func.terminal = terminal  # type: ignore[attr-defined]
        func.direction = direction  # type: ignore[attr-defined]
        return func

    return decorator


class AirResFall(BaseFall):
    """Physical model to simulate free fall motion with air resistance."""

    def __init__(
        self,
        initial_height: tuple,
        initial_velocity: tuple,
        mass: tuple,
        drag_coefficient: tuple = (0.47, ""),
        area: tuple = (1, "m**2"),
        rho: tuple = (1.225, "kg/m**3"),
    ):
        """Initialize the AirResFall class.

        Args:
            initial_height (tuple): initial height of the object
            initial_velocity (tuple): initial velocity of the object
            mass (tuple): mass of the object
            drag_coefficient (tuple): drag coefficient of the object
            area (tuple): cross sectional area of the object
            rho (tuple): density of the medium

        """
        super().__init__(initial_height, initial_velocity)
        self.mass = value_parse_unit(mass)
        self.Cd = value_parse_unit(drag_coefficient)
        self.A = value_parse_unit(area)
        self.rho = value_parse_unit(rho)

    def _equations(self, _t: NDArray, y: NDArray) -> list:
        """Equations of motions for solving free fall model.

        Args:
            t (NDArray): time vector
            y (NDArray): solution vector

        """
        v = y[1]
        dydt = v
        drag = 0.5 * self.rho.m_as("kg/m^3") * self.Cd.m * self.A.m_as("m^2") * v**2 * np.sign(v)
        dvdt = -self.g.m_as("m/s^2") - drag / self.mass.m_as("kg")
        return [dydt, dvdt]

    @event_decorator(terminal=True, direction=-1)
    def _hit_ground(self, _t: np.ndarray, y: np.ndarray) -> float:
        """Terminate when ground is hit."""
        return y[0]

    def solve_eq(self) -> dict:
        """Calculate solutions for free fall model with air resistance.

        Returns
            dict: dictionary with height, velocity and time solutions

        """
        initial_conditions = [self._initial_height.m_as("m"), self._initial_velocity.m_as("m/s")]
        time_span = (0, 1000)
        time_points = np.arange(time_span[0], time_span[1], self.time_discretization_step.m_as("s"))

        sol = solve_ivp(self._equations, time_span, initial_conditions, t_eval=time_points, events=self._hit_ground)

        height = value_parse_unit((sol.y[0], "m"))
        time = value_parse_unit((sol.t, "s"))
        velocity = value_parse_unit((np.abs(sol.y[1]), "m/s"))

        return {
            "height": height.to(self._initial_height.u),
            "velocity": velocity.to(self._initial_velocity.u),
            "time": time,
        }
