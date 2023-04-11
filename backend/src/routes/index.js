import { loginRoute } from "./loginRoute.js"
import { signUpRoute } from "./signUpRoute.js"
import { fetchRoles } from "./roles/fetchRoles.js"
import { createRoles } from "./roles/createRole.js"
import { updateRole } from "./roles/updateRole.js"
import { createOrganization } from "./organization/createOrganization.js"
import { fetchOrganization } from "./organization/fetchOrganization.js"
export const routes = [
    loginRoute,
    signUpRoute,
    fetchRoles,
    createRoles,
    updateRole,
    createOrganization,
    fetchOrganization
]