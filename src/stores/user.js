import { BASE_URL, USER_ROLES } from '../utils/constans'
import {
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
} from '../utils/localStorage'
import { defineStore } from 'pinia'
import { POST, GET } from '../http'
import { ref } from 'vue'

import router from '../router'

export const useUserStore = defineStore('user', () => {
	const user = ref(null)

	const logIn = async (form) => {
		try {
			const response = await POST(`${BASE_URL}/auth/log-in`, form, true)

			user.value = response.data.user
			setLocalStorage('user', user.value)

			if (user.value.role === USER_ROLES.admin) {
				router.push({ name: 'admin-home' })
			} else if (user.value.role === USER_ROLES.customer) {
				router.push({ name: 'home' })
			}
		} catch (error) {
			throw error
		}
	}

	const validateSession = async () => {
		try {
			await GET(`${BASE_URL}/auth/validate-session`, true)
			user.value = getLocalStorage('user')

			return !!user.value
		} catch (error) {
			removeLocalStorage('user')
			throw error
		}
	}

	return {
		user,
		logIn,
		validateSession,
	}
})
