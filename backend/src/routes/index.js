import { loginRoute } from "./loginRoute.js"
import { signUpRoute } from "./signUpRoute.js"
import { fetchRoles } from "./roles/fetchRoles.js"
import { createRoles } from "./roles/createRole.js"
export const routes = [
    loginRoute,
    signUpRoute,
    fetchRoles,
    createRoles
]