import os

import numpy as np
import pint
import resend
from django.conf import settings
from numpy._typing import NDArray


def email_resend(data: dict) -> dict:
    """Send email to developer.

    Args:
        data (dict): form information send from the frontend.

    Returns:
        dict: return message

    """
    resend.api_key = os.environ["RESEND_API_KEY"]
    try:
        resend.Emails.send(
            {
                "from": "Acme <onboarding@resend.dev>",
                "to": [settings.DEVELOPER_EMAIL],
                "subject": f"Message from {data['name']}<{data['email']}>",
                "reply_to": data["email"],
                "html": f"<p>{data['message']}<p>",
            }
        )
    except resend.exceptions.ValidationError as e:
        e.message = "Invalid email address."
        return {"error": "Something went wrong! Check your provided information."}
    else:
        return {"message": "Your message has been sent successfully."}


def ureg_f() -> pint.UnitRegistry:
    """Provide ureg class.

    Provide the ureg class. Can be used to specify custom units.

    Returns
        pint.UnitRegistry: unit registry

    """

    ureg = pint.UnitRegistry(autoconvert_offset_to_baseunit=True)
    ureg.setup_matplotlib()

    return ureg


ureg = ureg_f()


def _magnitude(tpl: tuple | list) -> float | int | NDArray | None:
    if isinstance(tpl[0], float | int | np.ndarray):
        return tpl[0]
    if not tpl[0]:
        return np.nan
    raise TypeError(f"int, float, ndarray expected, got {type(tpl[0])}")


def _try_convert_2_quantity(tpl: tuple, value: float | NDArray) -> pint.Quantity:
    try:
        string = tpl[1]
        if not isinstance(string, str):
            raise TypeError(f"str expected, got {type(string)}")
    except IndexError:
        string = ""

    if string:
        string = string.strip()

    return value * ureg.parse_expression(string)


def _try_convert_2_requested_unit(tpl: tuple, quant: pint.Quantity) -> pint.Quantity:
    try:
        req_unit: str | None = tpl[2]
        if req_unit is not None:
            quant.ru = req_unit if isinstance(req_unit, str) else "dimensionless"
            quant.requested_unit = quant.ru
            quant = quant.to(quant.ru)
    except IndexError:
        quant.ru = None
    return quant


def value_parse_unit(tpl: tuple | None | pint.Quantity) -> pint.Quantity:
    """Parse unit strings and attach to value if needed."""
    if isinstance(tpl, pint.Quantity):
        return tpl

    if tpl:  # tpl not None
        value = _magnitude(tpl)
        quant = _try_convert_2_quantity(tpl, value)
        return _try_convert_2_requested_unit(tpl, quant)

    quant = ureg.Quantity(np.nan, "")
    quant.ru = None
    return quant
