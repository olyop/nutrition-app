import {
	FC,
	useState,
	Fragment,
	useEffect,
	createElement,
} from "react"

import isNull from "lodash/isNull"
import { createBem } from "@oly_op/bem"
import Button from "@oly_op/react-button"
import { useMutation } from "@apollo/client"
import { addDashesToUUID } from "@oly_op/uuid-dashes"

import {
	FormState,
	LogInData,
	LogInInput,
	FormChange,
	SignUpData,
	SignUpInput,
	FormStateLogIn,
	FormStateSignUp,
} from "./types"

import LOG_IN from "./log-in.gql"
import SIGN_UP from "./sign-up.gql"
import initState from "./init-state"
import { getJWT, setJWT } from "../../helpers"

import "./index.scss"

const bem = createBem("Authorization")

const isLogInForm =
	(form: FormStateLogIn | FormStateSignUp): form is FormStateLogIn =>
		"userID" in form

const Authorization: FC = ({ children }) => {
	const [ wait, setWait ] = useState(true)
	const [ toggle, setToggle ] = useState(true)
	const [ forms, setForms ] = useState<FormState>(initState)
	const [ logIn ] = useMutation<LogInData, LogInInput>(LOG_IN)
	const [ signUp ] = useMutation<SignUpData, SignUpInput>(SIGN_UP)

	const handleLogIn =
		async (form: FormStateLogIn) => {
			const { password } = form
			const userID = addDashesToUUID(form.userID)

			const { data } =
				await logIn({
					variables: { input: { userID, password } },
				})

			if (data && data.logIn !== null) {
				setJWT(data.logIn)
				location.reload()
			}
		}

	const handleSignUp =
		async (form: FormStateSignUp) => {
			const { name, email, password } = form

			const { data } =
				await signUp({
					variables: { input: { name, email, password } },
				})

			if (data && data.signUp !== null) {
				setJWT(data.signUp)
				setForms(initState)
				location.reload()
			}
		}

	const handleToggle =
		() => {
			setForms(initState)
			setToggle(prevState => !prevState)
		}

	const handleFormChange: FormChange =
		(formKey, fieldKey) => event =>
			setForms(prevState => ({
				...prevState,
				[formKey]: {
					...prevState[formKey],
					[fieldKey]: event.target.value,
				},
			}))

	const handleFormSubmit =
		async () => {
			const form = forms[toggle ? "logIn" : "signUp"]
			if (isLogInForm(form)) await handleLogIn(form)
			else await handleSignUp(form)
		}

	useEffect(() => {
		const timer = setTimeout(() => { setWait(false) }, 1000)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	if (!isNull(getJWT())) {
		return (
			<Fragment>
				{children}
			</Fragment>
		)
	} else {
		if (wait) {
			return null
		} else {
			return (
				<div className={bem("")}>
					<div className={bem("content", "Elevated Padding BorderRadius")}>
						<h1 className="Heading1">
							Authenticate
						</h1>
						<Button
							icon="arrow_forward"
							onClick={handleToggle}
							className={bem("toggle", "MarginTopBottom")}
							text={`Go to ${toggle ? "Signup" : "Login"} page`}
						/>
						<div className={bem("form")}>
							{toggle ? (
								<form>
									<label
										children="User Identification"
										className={bem("label", "Text2 MarginBottomQuart")}
									/>
									<input
										maxLength={32}
										id="logInUserIdField"
										autoComplete="username"
										value={forms.logIn.userID}
										className={bem("input", "Text")}
										onChange={handleFormChange("logIn", "userID")}
									/>
									<label
										children="Password"
										className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
									/>
									<input
										type="password"
										id="logInPasswordField"
										value={forms.logIn.password}
										autoComplete="current-password"
										className={bem("input", "Text")}
										onChange={handleFormChange("logIn", "password")}
									/>
									<Button
										icon="login"
										text="Submit"
										onClick={handleFormSubmit}
										className={bem("submit", "Text2 MarginTop")}
									/>
								</form>
							) : (
								<form>
									<label
										children="Name"
										className={bem("label", "Text2 MarginBottomQuart")}
									/>
									<input
										id="signUpNameField"
										value={forms.signUp.name}
										className={bem("input", "Text")}
										onChange={handleFormChange("signUp", "name")}
									/>
									<label
										children="Email"
										className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
									/>
									<input
										type="email"
										id="signUpEmailField"
										value={forms.signUp.email}
										className={bem("input", "Text")}
										onChange={handleFormChange("signUp", "email")}
									/>
									<label
										children="Password"
										className={bem("label", "Text2 MarginBottomQuart MarginTopHalf")}
									/>
									<input
										type="password"
										id="signUpPasswordField"
										value={forms.signUp.password}
										className={bem("input", "Text")}
										onChange={handleFormChange("signUp", "password")}
									/>
									<Button
										text="Submit"
										icon="person_add"
										onClick={handleFormSubmit}
										className={bem("submit", "Text2 MarginTop")}
									/>
								</form>
							)}
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Authorization