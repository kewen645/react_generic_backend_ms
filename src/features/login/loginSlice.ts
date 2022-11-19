import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

export type UserType = {
	username: string
	password: string
}

interface LoginState {
	user: UserType
}

const initialState: LoginState = {
	user: { username: 'tom', password: 'tom123' },
}

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		userLogin: (state, action: PayloadAction<UserType>) => {
			state.user['username'] = action.payload.username
			state.user['password'] = action.payload.password
		},
		userLogout: (state) => {
			state.user['username'] = ''
			state.user['password'] = ''
		},
	},
})

// actions
export const { userLogin, userLogout } = loginSlice.actions

// selector
export const selectUser = (state: RootState) => state.login.user

export default loginSlice.reducer
