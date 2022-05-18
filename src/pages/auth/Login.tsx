import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import { ControllerTexFieldComp } from "../../components/formFields/TextFieldController";
import { loginDetails } from "../../store/rootSlice";
import { AppDispatch } from "../../store/store";
import { useFormik } from "formik";
import { TextField } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch: AppDispatch = useDispatch();

	const history = useNavigate();

	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (data) => {
			setLoading(true);
			console.log(data);
			const { email, password } = data;
			if (error !== "") setError("");
			auth
				.signInWithEmailAndPassword(email, password)
				.then((result: any) => {
					logging.info(result);
					dispatch(
						loginDetails({
							email: result.user.email,
							accessToken: result.user.multiFactor.user.accessToken,
							refreshToken: result.user.refreshToken,
						}),
					);
					console.log(result.user.refreshToken);
					console.log(result.user.multiFactor.user.accessToken);
					console.log(result.user.email);
					history("/");
				})
				.catch((error: any) => {
					logging.error(error.message);
					setError(error.message);
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	// get functions to build form with useForm() hook

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
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" color="primary">
						Sign in
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
								type="password"
								label="Password"
								style={{ marginTop: "2rem", marginBottom: "2rem" }}
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
									Sign In
								</LoadingButton>
							) : (
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 5, mb: 2 }}
								>
									Sign In
								</Button>
							)}
						</form>
						<Typography>{error}</Typography>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Link
								to="/register"
								style={{
									fontFamily: "sans-serif",
									fontSize: "0.8rem",
									marginTop: "10px",
								}}
							>
								Don't have an account? Register Here
							</Link>
							<Link
								to="/forgot"
								style={{
									fontFamily: "sans-serif",
									fontSize: "0.8rem",
									marginTop: "10px",
								}}
							>
								Forgot Password? Reset Here
							</Link>
						</Box>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
