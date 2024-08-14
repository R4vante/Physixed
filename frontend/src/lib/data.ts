import { InputParams, IRoute } from "@/lib/types"
import placeholder from "@/assets/placeholder.jpg"

export const links: IRoute[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Kinematics",
        href: "/kinematics",
        subRoutes: [
            {
                title: "Free Fall Motion",
                description: "Experience the free fall motion like never before!",
                href: "/kinematics/free-fall",
                image: placeholder,
            },
            {
                title: "Free Fall with Air Resistance",
                description: "Want some air resistance? We got you covered!",
                href: "/kinematics/air-resistance",
                image: placeholder,
            },
        ]
    },
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
