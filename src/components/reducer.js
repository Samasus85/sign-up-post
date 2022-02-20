import {
	EMAIL,
	NAME,
	nameRegExp,
	PASSWORD,
	VALID,
	VALID1,
	VALID2,
	validEmailRegex,
} from '../utils/constants/constants'
export const initialState = {
	name: { value: '', isValid: null, error: '' },
	email: { value: '', isValid: null, error: '' },
	password: { value: '', isValid: null, error: '' },
}

export const formReducer = (state, action) => {
	switch (action.type) {
		case NAME:
			return {
				...state,
				name: {
					value: action.val,
					isValid: nameRegExp.test(action.val),
					error: '',
				},
			}
		case VALID:
			return {
				...state,
				name: {
					value: state.name.value,
					isValid: nameRegExp.test(state.name.value),
					error: nameRegExp.test(state.name.value)
						? ''
						: state.name.value === ''
						? 'invalid!'
						: 'must have digits!',
				},
			}

		case EMAIL:
			return {
				...state,
				email: {
					value: action.val,
					isValid: validEmailRegex.test(action.val),
					error: '',
				},
			}
		case VALID1:
			return {
				...state,
				email: {
					value: state.email.value,
					isValid: validEmailRegex.test(state.email.value),
					error: validEmailRegex.test(state.email.value)
						? ''
						: state.email.value === ''
						? 'invalid!'
						: 'gmail is not valid!',
				},
			}
		case PASSWORD:
			let validPassword = action.val.split('').slice(0, 2)
			let reversPassword = action.val.split('').reverse().join('')
			return {
				...state,
				password: {
					value: reversPassword + validPassword.join(''),
					isValid: action.val.trim().length > 6,
					error: '',
				},
			}
		case VALID2:
			return {
				...state,
				password: {
					value: state.password.value,
					isValid: state.password.value.trim().length > 6,
					error:
						state.password.value.trim().length > 6
							? ''
							: state.password.value === ''
							? 'invalid!'
							: 'password is not valid!',
				},
			}
		default:
			return state
	}
}
