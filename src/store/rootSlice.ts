import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDetails {
	yourDetails: {
		firstName: string;
		lastName: string;
		dob: string;
		gender: string;
		annualIncome: number;
		panNumber: string;
		doorNo: string | undefined;
		street: string;
		zipCode: string | undefined;
		phoneNumber: string;
	};
	auth: {
		email: string;
		refreshToken: string;
		accessToken: string;
	};
	completedSteps: {
		stepOne: boolean;
		stepTwo: Boolean;
		stepThree: boolean;
		currentStep: string;
	};
}

export interface Step1 {
	firstName: string;
	lastName: string;
}

export interface Step2 {
	annualIncome: number;
	phoneNumber: string;
	dob: string;
	gender: string;
}

export interface Step3 {
	doorNo: string;
	street: string;
	zipCode: string;
}

export interface Auth {
	email: string;
	accessToken: string;
	refreshToken: string;
}

export interface Steps {
	stepOne?: boolean;
	stepTwo?: boolean;
	stepThree?: boolean;
	currentStep?: string;
}

export const initialState = {
	yourDetails: {
		firstName: "",
		lastName: "",
		dob: "",
		gender: "",
		annualIncome: 0,
		panNumber: "",
		doorNo: "",
		street: "",
		zipCode: "",
		phoneNumber: "",
	},
	auth: {
		email: "",
		refreshToken: "",
		accessToken: "",
	},
	completedSteps: {
		stepOne: false,
		stepTwo: false,
		stepThree: false,
		currentStep: "",
	},
};

export const rootSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		updateDetails: (
			state: UserDetails,
			action: PayloadAction<Steps | Step1 | Step2 | Step3 | Auth>,
		) => {
			state.yourDetails = {
				...state.yourDetails,
				...action.payload,
			};
		},
		reset: (state: UserDetails) => {
			state.yourDetails = initialState.yourDetails;
			state.completedSteps = initialState.completedSteps;
		},
		loginDetails: (state: UserDetails, action: PayloadAction<Auth>) => {
			state.auth = {
				...state.auth,
				...action.payload,
			};
		},
		steps: (state: UserDetails, action: PayloadAction<Steps>) => {
			state.completedSteps = {
				...state.completedSteps,
				...action.payload,
			};
		},
		logoutOption: (state: UserDetails) => {
			state.auth = initialState.auth;
		},
	},
});

export const { updateDetails, reset, loginDetails, steps, logoutOption } =
	rootSlice.actions;

export default rootSlice.reducer;
