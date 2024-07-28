import numpy as np
import pytest

from base.pytools.exceptions import InvalidTypeError, InvalidValueError
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

        assert model._mass.m_as("kg") == 1
        assert model._Cd.m_as("") == 0.47
        assert model._A.m_as("m**2") == 1

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
        ("mass", "drag_coefficient", "area", "density", "expected_message"),
        [
            (
                None,
                (0.47, ""),
                (1, "m**2"),
                (1.1227, "kg/m**3"),
                "Mass must be a tuple of magnitude and unit.",
            ),
            (
                (10, "kg"),
                0.47,
                (1, "m**2"),
                (1.1227, "kg/m**3"),
                "Drag coefficient must be a tuple of magnitude and unit.",
            ),
            (
                (10, "kg"),
                (0.47, ""),
                "1 m**2",
                (1.1227, "kg/m**3"),
                "Area must be a tuple of magnitude and unit.",
            ),
            (
                (10, "kg"),
                (0.47, ""),
                (1, "m**2"),
                None,
                "Density must be a tuple of magnitude and unit.",
            ),
        ],
    )
    def test_is_tuple_exception(
        self,
        mass: float | str | None,
        drag_coefficient: float | str | None,
        area: float | str | None,
        density: float | str | None,
        expected_message: str,
    ) -> None:
        """Test exception when height or velocity are not tuples.

        Args:
            mass (float | str | None): Value for mass.
            drag_coefficient (float | str | None): Value for drag coefficient.
            area (float | str | None): Value for area.
            density (float | str | None): Value for density.
            expected_message (str): Error message.

        """
        with pytest.raises(InvalidTypeError) as e:
            # ignore type because we are testing invalid types
            AirResFall((10, "m"), (0, "m/s"), mass=mass, drag_coefficient=drag_coefficient, area=area, rho=density)  # type: ignore[arg-type]
        assert e.value.message == expected_message

    def test_is_empty_mass_exception(self) -> None:
        """Test if exception is raised when height or velocity are empty.

        Args:
            mass (tuple): Mass of the object
            drag_coefficient (tuple): Drag coefficient of the object
            area (tuple): Area of the object
            density (tuple): Density of the medium
            expected_message (str): Error message

        """

        with pytest.raises(InvalidValueError) as e:
            AirResFall((10, "m"), (0, "m/s"), ())
        assert e.value.message == "Mass cannot be empty."

    @pytest.mark.parametrize(
        ("mass", "drag_coefficient", "area", "density", "expected_message"),
        [
            ((-10, "kg"), (0.47, ""), (1, "m**2"), (1.1227, "kg/m**3"), "Mass must be greater than 0."),
            ((10, "kg"), (-0.47, ""), (1, "m**2"), (1.1227, "kg/m**3"), "Drag coefficient must be greater than 0."),
            ((10, "kg"), (0.47, ""), (-1, "m**2"), (1.1227, "kg/m**3"), "Area must be greater than 0."),
            ((10, "kg"), (0.47, ""), (1, "m**2"), (-1.1227, "kg/m**3"), "Density must be greater than 0."),
        ],
    )
    def test_is_negative(
        self, mass: tuple, drag_coefficient: tuple, area: tuple, density: tuple, expected_message: str
    ) -> None:
        """Test exception when height or velocity are negative.

        Args:
            mass (tuple): Mass of the object
            drag_coefficient (tuple): Drag coefficient of the object
            area (tuple): Area of the object
            density (tuple): Density of the medium
            expected_message (str): Error message

        """
        with pytest.raises(InvalidValueError) as e:
            AirResFall((10, "m"), (0, "m/s"), mass, drag_coefficient, area, density)
        assert e.value.message == expected_message
