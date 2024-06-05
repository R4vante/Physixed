from typing import Any

development_apps: dict[str, Any] = {
    "px_main": {
        "mount_point": "",
        "log_files": ["views"],
    },
    "px_kinematics": {
        "mount_point": "px/kinematics/",
        "log_files": ["views"],
    },
}
