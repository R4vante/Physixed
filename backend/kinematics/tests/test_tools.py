import pytest
from pint import Quantity

from base.pytools.exceptions import InvalidValueError
from kinematics.pytools.free_fall import FreeFall


@pytest.fixture()
def free_fall_model_happy() -> FreeFall:
    """Create the free fall instance.

    Returns
       FreeFall: A free fall model instance

    """
    return FreeFall((10, "m"), (0, "m/s"))


class TestFreeFallHappy:
    """Happy path testing for free fall model."""

    def test_solve_endtime(self, free_fall_model_happy: FreeFall) -> None:
        """Test end time method of free fall object.

        Args:
            free_fall_model_happy (FreeFall): Fixture to create the free fall object

        """

        assert isinstance(free_fall_model_happy.solve_endtime(), Quantity)
        assert free_fall_model_happy.solve_endtime().magnitude == pytest.approx(1.43, rel=0.1)
        assert free_fall_model_happy.solve_endtime().units == "second"

    def test_solve(self, free_fall_model_happy: FreeFall) -> None:
        """Test model solve of free fall object.

        Args:
            free_fall_model_happy (FreeFall): Fixture to create the free fall object

        """

        assert isinstance(free_fall_model_happy.solve_eq(), dict)


class TestFreeFallSad:
    """Sad path testing for free fall model."""

    def test_solve_endtime(self) -> None:
        """Test errorhandling initializiation of the free fall instance."""

        with pytest.raises(InvalidValueError) as e:
            FreeFall((-10, "m"), (10, "m/s"))

        assert str(e.value) == "Height cannot be smaller than 0."
