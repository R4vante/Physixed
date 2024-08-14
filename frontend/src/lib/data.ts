export const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Kinematics",
        path: "/kinematics",
        subRoutes: [
            {
                name: "Free Fall Motion",
                path: "/kinematics/free-fall",
                description: "Experience the free fall motion like never before!"
                },
            {
                name: "Air Resistance",
                path: "/kinematics/air-resistance",
                description: "Want some air resistance? We got you covered!"

            }
    ],
    }
]

export const inputParameters = [
    {
        name: "height",
        label: "Initial Height",
        unitName: "height_unit",
        unitOptions: ["m", "km"]
    },

    {
        name: "velocity",
        label: "Initial Velocity",
        unitName: "velocity_unit",
        unitOptions: ["m/s", "km/h"]
    },

    {
        name: "mass",
        label: "Mass",
        unitName: "mass_unit",
        unitOptions: ["kg"]
    },

    {
        name: "drag_coefficient",
        label: "Drag Coefficient",
    },

    {
        name: "area",
        label: "Area",
        unitName: "area_unit",
        unitOptions: ["m^2"]
    },

    {
        name: "density",
        label: "Density",
        unitName: "density_unit",
        unitOptions: ["(kg/m^3)"]
    }
]
