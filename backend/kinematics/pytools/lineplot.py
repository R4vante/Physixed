import numpy as np
import pint
import plotly.graph_objs as go


def make_plot(x_data: pint.Quantity, y_data: pint.Quantity) -> str:
    """Create a plotly JSON representation as a string.

    Args:
        x_data: x values
        y_data: y_values

    Returns:
        JSON string cosisting plotly plot

    Raises:
        TypeError: Invalid x data
        TypeError: Invalid y data

    """

    if not isinstance(x_data, pint.Quantity):
        raise TypeError("x_data must be a pint.Quantity and either a list or array")

    if not isinstance(y_data, pint.Quantity):
        raise TypeError("y_data must be a pint.Quantity and either a list or array")

    compact_unit_x = np.max(x_data).to_compact().units
    compact_unit_y = np.max(y_data).to_compact().units

    fig = go.Figure()

    fig.add_trace(
        go.Scatter(
            x=x_data.m_as(compact_unit_x),
            y=y_data.m_as(compact_unit_y),
            mode="lines",
        ),
    )

    fig.update_layout(
        xaxis_title=f"{compact_unit_x:P}",
        yaxis_title=f"{compact_unit_y:P}",
        paper_bgcolor="rgba(0,0,0,0)",
        margin={"l": 5, "r": 5, "t": 5, "b": 5},
        width=400,
        height=400,
    )

    return fig.to_json()
