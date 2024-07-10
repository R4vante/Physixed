from typing import Any

development_apps: dict[str, Any] = {
<<<<<<< HEAD:physixed/px_development_apps.py
    "px_main": {
        "mount_point": "",
        "log_files": ["views"],
    },
    "px_kinematics": {
        "mount_point": "px/kinematics/",
=======
    "base": {
        "mount_point": "api/base/",
        "log_files": ["views"],
    },
    "kinematics": {
        "mount_point": "api/kinematics/",
>>>>>>> develop:backend/physixed/px_development_apps.py
        "log_files": ["views"],
    },
}
