
from typing import Any

development_apps: dict[str, Any] = {
    "base": {
        "mount_point": "api/base/",
        "log_files": ["views"],
    },
    "kinematics": {
        "mount_point": "api/kinematics/",
        "log_files": ["views"],
    },
}
