<script setup>
import { isValidEmail } from '../utils/validation'
import { useUserStore } from '../stores/user'
import { reactive } from 'vue'

import Alert from '../components/Alert.vue'

import EmailIcon from '../icons/EmailIcon.vue'
import LockIcon from '../icons/LockIcon.vue'

const { logIn } = useUserStore()

const form = reactive({
	email: '',
	password: '',
})

const formErrors = reactive({
	email: {
		error: false,
		message: '',
	},
	password: {
		error: false,
		message: '',
	},
	response: {
		error: false,
		message: '',
	},
})

const submitForm = async (e) => {
	e.preventDefault()
	clearFormErrors()

	if (!isValidForm()) return

	try {
		await logIn(form)
	} catch (error) {
		formErrors.response.error = true
		formErrors.response.message = error.message
	}
}

const isValidForm = () => {
	let isValid = true

	if (!isValidEmail(form.email)) {
		formErrors.email.error = true
		formErrors.email.message = 'Invalid email'
		isValid = false
	}
	if (form.password.length < 8) {
		formErrors.password.error = true
		formErrors.password.message = 'Password must be at least 8 characters'
		isValid = false
	}
	if (form.password.trim() === '') {
		formErrors.password.error = true
		formErrors.password.message = 'Password is required'
		isValid = false
	}

	return isValid
}

const clearFormErrors = () => {
	Object.keys(formErrors).forEach((key) => {
		formErrors[key].error = false
		formErrors[key].message = ''
	})
}
</script>

<template>
  <section
    class="bg-white border border-gray-200 rounded-lg px-4 py-6 w-full max-w-md mx-auto"
  >
    <h1 class="text-2xl font-semibold text-gray-900 mb-1">Log in</h1>
    <p class="text-gray-500 mb-4">
      Welcome to <span class="text-gray-900 font-medium">Book Store</span>.
      Please log in to continue.
    </p>
    <Transition name="fade">
      <Alert
        v-if="formErrors.response.error"
        type="danger"
        :message="formErrors.response.message"
        :handleClose="clearFormErrors"
      />
    </Transition>
    <form class="mt-4 flex flex-col gap-3" @submit="submitForm">
      <div>
        <label for="email" class="block mb-2 text-sm text-gray-900"
          >Your Email</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
          >
            <EmailIcon
              :styles="`${
                formErrors.email.error ? 'text-red-500' : 'text-gray-500'
              } size-5`"
            />
          </div>
          <input
            v-model="form.email"
            type="text"
            id="email"
            :class="`${
              formErrors.email.error
                ? 'bg-red-50 border-red-500'
                : 'bg-gray-50 border-gray-300'
            } border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`"
            placeholder="name@example.com"
          />
        </div>
        <Transition name="fade">
          <p v-if="formErrors.email.error" class="text-sm mt-1 text-red-500">
            {{ formErrors.email.message }}*
          </p>
        </Transition>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm text-gray-900"
          >Your password</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
          >
            <LockIcon
              :styles="`${
                formErrors.email.error ? 'text-red-500' : 'text-gray-500'
              } size-5`"
            />
          </div>
          <input
            v-model="form.password"
            type="password"
            id="password"
            :class="`${
              formErrors.email.error
                ? 'bg-red-50 border-red-500'
                : 'bg-gray-50 border-gray-300'
            } border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`"
            placeholder="***********"
          />
        </div>
        <Transition name="fade">
          <p v-if="formErrors.password.error" class="text-sm mt-1 text-red-500">
            {{ formErrors.password.message }}*
          </p>
        </Transition>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 ml-auto"
      >
        Log in
      </button>
    </form>
  </section>
</template>
