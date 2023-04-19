import { loginRoute } from "./loginRoute.js"
import { signUpRoute } from "./signUpRoute.js"
import { fetchRoles } from "./roles/fetchRoles.js"
import { createRoles } from "./roles/createRole.js"
import { updateRole } from "./roles/updateRole.js"
import { createOrganization } from "./organization/createOrganization.js"
import { fetchOrganization } from "./organization/fetchOrganization.js"
import { getOrganization } from "./organization/getorganization.js"
import { createIndividualInvestor } from "./individualInvestor/createIndividualInvestor.js"
import { fetchIndividualInvestors } from "./individualInvestor/fetchIndividualInvestors.js"
import { keyboardShortcutSave } from "./settings/keyboardShortcutSave.js"
import { updateOrganization } from "./organization/updateOrganization.js"
import { getUserSettings } from "./settings/user-settings.js"
import { updateUserSettings } from "./settings/addUserSettings.js"
export const routes = [
    loginRoute,
    signUpRoute,
    fetchRoles,
    createRoles,
    updateRole,
    createOrganization,
    fetchOrganization,
    getOrganization,
    createIndividualInvestor,
    fetchIndividualInvestors,
    keyboardShortcutSave,
    updateOrganization,
    getUserSettings,
    updateUserSettings
]