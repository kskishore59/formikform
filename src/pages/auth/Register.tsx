import { yupResolver } from "@hookform/resolvers/yup";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { LoadingButton } from "@mui/lab";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Container,
	TextField,
	Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import { ControllerTexFieldComp } from "../../components/formFields/TextFieldController";
import IPageProps from "../../interfaces/page";
import { useFormik } from "formik";

const RegisterPage: React.FunctionComponent<IPageProps> = (props) => {
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	const theme = createTheme();

	const history = useNavigate();

	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Passwords must match")
			.required("Confirm Password is required"),
		acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const { handleSubmit, control } = useForm(formOptions);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (data: any) => {
			setLoading(true);
			const { email, password } = data;
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((result) => {
					logging.info(result);
					history("/login");
				})
				.catch((error) => {
					logging.error(error);

					if (error.code.includes("auth/weak-password")) {
						setError("Please select strong password");
					} else if (error.code.includes("auth/email-already-in-use")) {
						setError("Email Already in use");
					} else {
						setError("Unable to register, please try again");
					}
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<AssignmentIndIcon />
					</Avatar>
					<Typography component="h1" variant="h5" color="primary">
						Register
					</Typography>
					<Box sx={{ mt: 1 }}>
						<form onSubmit={formik.handleSubmit}>
							<TextField
								fullWidth
								id="email"
								name="email"
								label="Email Address"
								style={{ marginTop: "2rem" }}
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								fullWidth
								id="password"
								name="password"
								label="Password"
								type="password"
								style={{ marginTop: "2rem", marginBottom: "2rem" }}
								value={formik.values.password}
								onChange={formik.handleChange}
								error={Boolean(formik.errors.password)}
								helperText={formik.errors.password}
							/>
							<TextField
								fullWidth
								id="confirmPassword"
								name="confirmPassword"
								label="Confirm Password"
								type="text"
								style={{ marginBottom: "2rem" }}
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
							{loading ? (
								<LoadingButton
									color="primary"
									loading={loading}
									loadingPosition="end"
									variant="contained"
									fullWidth
								>
									Register
								</LoadingButton>
							) : (
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Register
								</Button>
							)}
						</form>
						{error ? <Alert severity="error">{error}</Alert> : ""}
						<Link to="/login">Already have an account? Login Here</Link>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default RegisterPage;
