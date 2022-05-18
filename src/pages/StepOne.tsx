import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import IPageProps from "../interfaces/page";
import { Step1, steps, updateDetails } from "../store/rootSlice";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "./Navbar";
import { ControllerTexFieldComp } from "../components/formFields/TextFieldController";
import StepperComponent from "../components/StepperComponent/StepperComponent";
import { useFormik } from "formik";

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const details = useSelector((state: RootState) => state);
	const { firstName, lastName } = details.yourDetails;
	const { email } = details.auth;
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
	});

	const history = useNavigate();

	const formik = useFormik({
		initialValues: {
			firstName,
			lastName,
		},
		validationSchema: validationSchema,
		onSubmit: (data) => {
			console.log(data);
			dispatch(updateDetails(data));
			dispatch(steps({ stepOne: true }));
			console.log(details);
			history("/step2");
		},
	});

	// const onSubmit: SubmitHandler<Step1> = (data) => {
	// 	console.log(data);
	// 	dispatch(updateDetails(data));
	// 	dispatch(steps({ stepOne: true }));
	// 	console.log(details);
	// 	history("/step2");
	// };
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Navbar />
			<Container
				style={{
					minHeight: "100vh",
					backgroundColor: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h6" variant="subtitle1">
					Welcome Home {email}
				</Typography>
				<StepperComponent />

				<Box sx={{ mt: 5, width: "40%" }}>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="firstName"
							name="firstName"
							label="First Name"
							style={{ marginTop: "2rem" }}
							value={formik.values.firstName}
							onChange={formik.handleChange}
							error={
								formik.touched.firstName && Boolean(formik.errors.firstName)
							}
							helperText={formik.touched.firstName && formik.errors.firstName}
						/>
						<TextField
							fullWidth
							id="lastName"
							name="lastName"
							style={{ marginTop: "2rem" }}
							label="Last Name"
							value={formik.values.lastName}
							onChange={formik.handleChange}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							helperText={formik.touched.lastName && formik.errors.lastName}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mb: 2 }}
							style={{ marginTop: "20px" }}
						>
							Next
						</Button>
					</form>
				</Box>
			</Container>
		</Box>
	);
};

export default HomePage;
