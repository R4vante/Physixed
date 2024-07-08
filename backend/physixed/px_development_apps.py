from typing import Any

development_apps: dict[str, Any] = {
    "base": {
        "mount_point": "",
        "log_files": ["views"],
    },
    "kinematics": {
        "mount_point": "kinematics/",
        "log_files": ["views"],
    },
}
