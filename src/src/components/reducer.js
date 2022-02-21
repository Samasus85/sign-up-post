import {
	EMAIL,
	NAME,
	nameRegExp,
	PASSWORD,
	VALID,
	VALIDEMAIL,
	VALIDPASS,
	emailRegex,
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
					isValid: emailRegex.test(action.val),
					error: '',
				},
			}
		case VALIDEMAIL:
			return {
				...state,
				email: {
					value: state.email.value,
					isValid: emailRegex.test(state.email.value),
					error: emailRegex.test(state.email.value)
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
					isValid: action.val.trim().length > 5,
					error: '',
				},
			}
		case VALIDPASS:
			return {
				...state,
				password: {
					value: state.password.value,
					isValid: state.password.value.trim().length > 5,
					error:
						state.password.value.trim().length > 5
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
