import pytest

from kinematics.pytools.air_res import AirResFall
from kinematics.pytools.base_fall import BaseFall


class TestAirRes:
    """Test the AirResFall class."""

    def test_air_res_happy(self) -> None:
        """Happy path test for the air resistance model."""
        model = AirResFall((100000, "m"), (0, "m/s"), (1, "kg"))

        assert isinstance(model, BaseFall)
        assert model.solve_eq()["height"][-1] == pytest.approx(0, abs=2e-2)
