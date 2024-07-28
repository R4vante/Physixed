import numpy as np
import pytest

from base.pytools.exceptions import InvalidTypeError, NegativeValueError
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

    @pytest.mark.parametrize(
        ("height", "velocity", "mass", "drag_coefficient", "area", "rho"),
        [
            ((0, "m"), (10, "m/s"), (1, "kg"), (0.47, ""), (1, "m**2"), (1.225, "kg/m**3")),
            ((100, "m"), (0, "m/s"), (1, "kg"), (0.47, ""), (1, "m**2"), (1.225, "kg/m**3")),
            ((100, "m"), (0, "m/s"), (10000, "kg"), (2.0, ""), (10000, "m**2"), (100, "kg/m**3")),
        ],
    )
    def test_edge_cases(
        self, height: tuple, velocity: tuple, mass: tuple, drag_coefficient: tuple, area: tuple, rho: tuple
    ) -> None:
        """Test edge cases for the air resistance model.

        Args:
            height (tuple): height of the object
            velocity (tuple): velocity of the object
            mass (tuple): mass of the object
            drag_coefficient (tuple): drag coefficient of the object
            area (tuple): frontal area of the object
            rho (tuple): density of the medium

        """
        results = AirResFall(height, velocity, mass, drag_coefficient, area, rho).solve_eq()
        assert results["height"][-1] == pytest.approx(0, abs=1e-2)
        assert results["time"][-1] > 0
        assert len(results["velocity"]) == len(results["time"])
        assert len(results["height"]) == len(results["time"])


class TestSadPath:
    """Test the error handling of the air resistance model."""

    @pytest.mark.parametrize(
        ("height", "velocity", "expected_message"),
        [
            (None, (10, "m/s"), "Initial height must be a tuple of magnitude and unit."),
            (100, (10, "m/s"), "Initial height must be a tuple of magnitude and unit."),
            ("100", (10, "m/s"), "Initial height must be a tuple of magnitude and unit."),
            ((100, "m"), None, "Initial velocity must be a tuple of magnitude and unit."),
            ((100, "m"), 100, "Initial velocity must be a tuple of magnitude and unit."),
            ((100, "m"), "100", "Initial velocity must be a tuple of magnitude and unit."),
        ],
    )
    def test_is_tuple_exception(
        self, height: float | str | None, velocity: float | str | None, expected_message: str
    ) -> None:
        """Test exception when height or velocity are not tuples.

        Args:
            height (float | str | None): Value for initial height
            velocity (float | str | None): Value for initial velocity
            expected_message (str): Error message

        """
        with pytest.raises(InvalidTypeError) as e:
            # ignore type because we are testing invalid types
            AirResFall(height, velocity, (1, "kg"), (0.47, ""), (1, "m**2"), (1.225, "kg/m**3"))  # type: ignore[arg-type]
        assert e.value.message == expected_message

    @pytest.mark.parametrize(
        ("height", "velocity", "expected_message"),
        [
            ((), (10, "m/s"), "Initial height must have a value."),
            ((100, "m"), (), "Initial velocity must have a value."),
        ],
    )
    def test_is_empty_exception(self, height: tuple, velocity: tuple, expected_message: str) -> None:
        """Test if exception is raised when height or velocity are empty.

        Args:
            height (tuple): Initial height
            velocity (tuple): Initial velocity
            expected_message (str): error message

        """

        with pytest.raises(InvalidTypeError) as e:
            AirResFall(height, velocity, (1, "kg"), (0.47, ""), (1, "m**2"), (1.225, "kg/m**3"))
        assert e.value.message == expected_message

    @pytest.mark.parametrize(
        ("height", "velocity", "expected_message"),
        [
            ((-100, "m"), (10, "m/s"), "Height cannot be smaller than 0."),
            ((100, "m"), (-10, "m/s"), "Velocity cannot be smaller than 0."),
        ],
    )
    def test_is_negative(self, height: tuple, velocity: tuple, expected_message: str) -> None:
        """Test exception when height or velocity are negative.

        Args:
            height (tuple): Initial height
            velocity (tuple): Initial velocity
            expected_message (str): Error message

        """
        with pytest.raises(NegativeValueError) as e:
            AirResFall(height, velocity, (1, "kg"), (0.47, ""), (1, "m**2"), (1.225, "kg/m**3"))
        assert e.value.message == expected_message
