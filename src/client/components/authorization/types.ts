import { ChangeEventHandler } from "react"

export interface LogInData {
	logIn: string,
}

export interface SignUpData {
	signUp: string,
}

export interface LogInInput {
	input: {
		userID: string,
		password: string,
	},
}

export interface SignUpInput {
	input: {
		name: string,
		email: string,
		password: string,
	},
}

export interface FormStateLogIn {
	userID: string,
	password: string,
}

export interface FormStateSignUp {
	name: string,
	email: string,
	password: string,
}

export interface FormState {
	logIn: FormStateLogIn,
	signUp: FormStateSignUp,
}

export type FormChange = (
	formKey: keyof FormState,
	fieldKey: keyof (FormStateLogIn & FormStateSignUp)
) => ChangeEventHandler<HTMLInputElement>