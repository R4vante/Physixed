class NegativeValueError(Exception):
    """Raise error if number is smaller than 0."""

    def __init__(self, message: str | None = "Number cannot be smaller than 0"):
        self.message = message
        super().__init__(self.message)
