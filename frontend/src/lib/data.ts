import { InputParams, IRoute } from "@/lib/types"

export const links: IRoute[] = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Kinematics",
        path: "/kinematics"
    }
]

export const inputParameters: InputParams[] = [
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
