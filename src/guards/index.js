import { useUserStore } from '../stores/user'

export const isAuthenticated = (redirectRoute) => {
	return async (to, from, next) => {
		try {
			const { validateSession } = useUserStore()

			if (to.matched.some((record) => record.meta.requiresAuth)) {
				const isAuthenticated = await validateSession()
				if (!isAuthenticated) {
					next({ name: redirectRoute })
				} else {
					next()
				}
			} else {
				next()
			}
		} catch (error) {
			next({ name: redirectRoute })
		}
	}
}
