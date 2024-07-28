import numpy as np
import pytest

from kinematics.pytools.air_res import AirResFall


@pytest.fixture()
def initial_values() -> tuple:
    """Define initial values for the air resistance model.

    Returns
        tuple: Initial values

    """
    initial_height = (100, "m")
    initial_velocity = (0, "m/s")
    mass = (1, "kg")
    drag_coefficient = (0.47, "")
    area = (1, "m**2")
    rho = (1.225, "kg/m**3")

    return initial_height, initial_velocity, mass, drag_coefficient, area, rho


class TestHappyPath:
    """Test the AirResFall class."""

    def test_air_res_initialization(self, initial_values: tuple) -> None:
        """Test initialization of the air resistance model."""
        initial_height, initial_velocity, mass, drag_coefficient, area, rho = initial_values

        model = AirResFall(initial_height, initial_velocity, mass, drag_coefficient, area, rho)

        assert model._initial_height.m_as("m") == 100
        assert model._initial_velocity.m_as("m/s") == 0
        assert model.mass.m_as("kg") == 1
        assert model.Cd.m_as("") == 0.47
        assert model.A.m_as("m**2") == 1

    def test_equation(self, initial_values: tuple) -> None:
        """Test the equation method that calculates the derivatives."""

        initial_height, initial_velocity, mass, drag_coefficient, area, rho = initial_values

        t = 0
        y = np.array([100, 0])

        model = AirResFall(initial_height, initial_velocity, mass, drag_coefficient, area, rho)

        dydt = model._equations(t, y)

        assert len(dydt) == 2
        assert isinstance(dydt, list)

    def test_hit_ground(self, initial_values: tuple) -> None:
        """Test the hit ground event method.

        Args:
            initial_values (tuple): Initial values of the air resistance model.

        """
        initial_height, initial_velocity, mass, drag_coefficient, area, rho = initial_values

        model = AirResFall(initial_height, initial_velocity, mass, drag_coefficient, area, rho)

        assert model._hit_ground(np.array([0]), np.array([0])) == 0

    def test_solve_eq(self, initial_values: tuple) -> None:
        """Test if the differential equation is solved correctly.

        Args:
            initial_values (tuple): Initial values of the air resistance model.

        """
        initial_height, initial_velocity, mass, drag_coefficient, area, rho = initial_values
        model = AirResFall(initial_height, initial_velocity, mass, drag_coefficient, area, rho)

        results = model.solve_eq()

        assert results["height"][-1] == pytest.approx(0, abs=1e-2)
        assert results["time"][-1] > 0
        assert len(results["velocity"]) == len(results["time"])
        assert len(results["height"]) == len(results["time"])
