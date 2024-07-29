import pint
import pytest

from kinematics.pytools.free_fall import FreeFall


class TestHappyPath:
    """Test the FreeFall class."""

    @pytest.mark.parametrize(
        ("initial_height", "initial_velocity", "expected_time"),
        [
            ((10, "m"), (1, "m/s"), (1.3295, "second")),
            ((10, "km"), (1, "m/s"), (45.05, "second")),
            ((100, "m"), (10, "m/s"), (3.6095, "second")),
            ((100, "km"), (100, "km/h"), (139.98, "second")),
        ],
    )
    def test_solve_endtime(self, initial_height: tuple, initial_velocity: tuple, expected_time: tuple) -> None:
        """Test the solve end time method.

        Args:
            initial_height (tuple): Initial height of the object.
            initial_velocity (tuple): Initial velocity of the object.
            expected_time (tuple): Expected time till object hits the ground.

        """
        model = FreeFall(initial_height=initial_height, initial_velocity=initial_velocity)
        model_time = model.solve_endtime()
        assert isinstance(model_time, pint.Quantity)
        assert model_time.m == pytest.approx(expected_time[0], rel=1e-2)
        assert str(model_time.u) == expected_time[1]

    @pytest.mark.parametrize(
        ("initial_height", "initial_velocity", "expected_time", "expected_height", "expected_velocity"),
        [
            ((10, "m"), (1, "m/s"), (1.3295, "second"), (0, "meter"), (14.01, "meter / second")),
            ((10, "km"), (1, "m/s"), (45.05, "second"), (0, "kilometer"), (442.95, "meter / second")),
            ((100, "m"), (10, "m/s"), (3.6095, "second"), (0, "meter"), (45.41, "meter / second")),
            ((100, "km"), (100, "km/h"), (139.98, "second"), (0, "kilometer"), (5044, "kilometer / hour")),
        ],
    )
    def test_solve_eq(
        self,
        initial_height: tuple,
        initial_velocity: tuple,
        expected_time: tuple,
        expected_height: tuple,
        expected_velocity: tuple,
    ) -> None:
        """Test the solve equation method.

        Args:
            initial_height (tuple): Initial height of the object.
            initial_velocity (tuple): Initial velocity of the object.
            expected_time (tuple): Expected time magnitude and unit.
            expected_height (tuple): Expected height magnitude and unit.
            expected_velocity (tuple): Expected velocity magnitude and unit.

        """
        model = FreeFall(initial_height=initial_height, initial_velocity=initial_velocity)
        model_eq = model.solve_eq()
        assert isinstance(model_eq, dict)
        assert "height" in model_eq
        assert "velocity" in model_eq
        assert "time" in model_eq
        assert isinstance(model_eq["height"], pint.Quantity)
        assert isinstance(model_eq["velocity"], pint.Quantity)
        assert isinstance(model_eq["time"], pint.Quantity)
        assert model_eq["height"][-1].m == pytest.approx(expected_height[0], rel=1e-2)
        assert model_eq["velocity"][-1].m == pytest.approx(expected_velocity[0], rel=1e-2)
        assert model_eq["time"][-1].m == pytest.approx(expected_time[0], rel=1e-2)
        assert str(model_eq["height"].u) == expected_height[1]
        assert str(model_eq["velocity"].u) == expected_velocity[1]
        assert str(model_eq["time"].u) == expected_time[1]
