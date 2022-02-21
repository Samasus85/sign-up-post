import { useReducer, useState, useEffect } from 'react'
import css from './SignUp.module.css'
import { formReducer, initialState } from '../reducer'
import { useNavigate } from 'react-router-dom'
import {
	BASE_URL,
	EMAIL,
	NAME,
	PASSWORD,
	VALID,
	VALIDEMAIL,
	VALIDPASS,
} from '../../utils/constants/constants'

const SignUp = (props) => {
	const navigate = useNavigate()
	const [formState, dispatchform] = useReducer(formReducer, initialState)
	const [formIsValid, setFormIsValid] = useState(false)

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(
				formState.name.isValid &&
				formState.email.isValid &&
				formState.password.isValid,
			)
		}, 1000)

		return () => {
			clearTimeout(identifier)
		}
	}, [
		formState.name.isValid,
		formState.email.isValid,
		formState.password.isValid,
	])

	const nameChangeHandler = (e) => {
		dispatchform({ type: NAME, val: e.target.value })
	}
	const emailChangeHandler = (e) => {
		dispatchform({ type: EMAIL, val: e.target.value })
	}
	const passwordChangeHandler = (e) => {
		dispatchform({ type: PASSWORD, val: e.target.value })
	}
	const validateNameHandler = () => {
		dispatchform({ type: VALID })
	}
	const validateEmailHandler = () => {
		dispatchform({ type: VALIDEMAIL })
	}
	const validatePasswordHandler = () => {
		dispatchform({ type: VALIDPASS })
	}

	function submitHandler(e) {
		e.preventDefault()
		const userData = {
			name: formState.name.value,
			email: formState.email.value,
			password: formState.password.value,
		}
		async function postLoginHandler() {
			const response = await fetch(`${BASE_URL}/login.json`, {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-type': 'application/json',
				},
			})
		}
		postLoginHandler()
		return navigate('/Login')
	}

	return (
		<div className={css.forms}>
			<form className={css['form-container']} onSubmit={submitHandler}>
				<h2 className={css.text}>Зарегистрироваться</h2>
				<div
					className={`${css.form} ${formState.name.isValid === false ? css.invalid : ''
						}`}
				>
					<input
						className={css['form-input']}
						type='text'
						id='name'
						placeholder='Ваше имя'
						onChange={nameChangeHandler}
						onBlur={validateNameHandler}
					/>

					<label htmlFor='name' className={css['form-label']}>
						Ваше имя:
					</label>
					<p className={css.error}>{formState.name.error}</p>
				</div>
				<div
					className={`${css.form} ${formState.email.isValid === false ? css.invalid : ''
						}`}
				>
					<input
						className={css['form-input']}
						type='email'
						id='email'
						placeholder='E-mail'
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
					<label htmlFor='email' className={css['form-label']}>
						E-mail:
					</label>
					<p className={css.error}>{formState.email.error}</p>
				</div>
				<div
					className={`${css.form} ${formState.password.isValid === false
						? css.invalid
						: ''
						}`}
				>
					<input
						className={css['form-input']}
						type='password'
						id='password'
						placeholder='Пароль'
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
					<label htmlFor='password' className={css['form-label']}>
						Пароль:
					</label>
					<p className={css.error}>{formState.password.error}</p>
				</div>
				<button
					type='submit'
					className={css.btn}
					disabled={!formIsValid}
				>
					Регистрация
				</button>
			</form>
			<p className={css.questinon}>
				У вас уже есть аккаунт? <br />
				<a className={css.come} href='/'>Войти</a>
			</p>
		</div>
	)
}
export default SignUp
