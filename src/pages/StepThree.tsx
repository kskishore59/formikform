import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { ControllerTexFieldComp } from "../components/formFields/TextFieldController";
import IPageProps from "../interfaces/page";
import { Step3, steps, updateDetails } from "../store/rootSlice";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "./Navbar";
import StepperComponent from "../components/StepperComponent/StepperComponent";
import { useFormik } from "formik";

const StepThree: React.FunctionComponent<IPageProps> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const details = useSelector((state: RootState) => state);
	const { gender, phoneNumber, annualIncome, dob, doorNo, street, zipCode } =
		details.yourDetails;
	const { email } = details.auth;
	const validationSchema = Yup.object().shape({
		doorNo: Yup.number()
			.required("Door No. is required")
			.min(2)
			.typeError("Please enter only Numbers from 0-9"),
		street: Yup.string().required("Street Name is required"),
		zipCode: Yup.string()
			.required("Zip Code is required")
			.min(6, "Zip code must be 6 characters")
			.max(6, "Zip code must be 6 characters")
			.typeError("Please enter only Numbers from 0-9"),
	});

	const push = useNavigate();

	useEffect(() => {
		if (!gender || !phoneNumber || !annualIncome || !dob) {
			push("/step2");
		}
	});

	const onClickBack = () => {
		push("/step2");
	};

	const formik = useFormik({
		initialValues: {
			doorNo,
			street,
			zipCode,
		},
		validationSchema: validationSchema,
		onSubmit: (data) => {
			console.log(data);
			dispatch(updateDetails(data));
			dispatch(steps({ stepThree: true }));
			console.log(details);
			push("/result");
		},
	});

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
				<Box sx={{ mt: 2, width: "40%" }}>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="doorNo"
							name="doorNo"
							label="Door No"
							type="text"
							style={{ marginTop: "2rem" }}
							value={formik.values.doorNo}
							onChange={formik.handleChange}
							error={formik.touched.doorNo && Boolean(formik.errors.doorNo)}
							helperText={formik.touched.doorNo && formik.errors.doorNo}
						/>

						<TextField
							fullWidth
							id="street"
							name="street"
							label="Street"
							type="text"
							style={{ marginTop: "2rem" }}
							value={formik.values.street}
							onChange={formik.handleChange}
							error={formik.touched.street && Boolean(formik.errors.street)}
							helperText={formik.touched.street && formik.errors.street}
						/>

						<TextField
							fullWidth
							id="zipCode"
							name="zipCode"
							label="Zip Code"
							type="text"
							style={{ marginTop: "2rem" }}
							value={formik.values.zipCode}
							onChange={formik.handleChange}
							error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
							helperText={formik.touched.zipCode && formik.errors.zipCode}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							style={{ marginTop: 10, marginBottom: 3 }}
						>
							Next
						</Button>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							type="button"
							onClick={onClickBack}
							style={{ marginTop: 10, marginBottom: 10 }}
						>
							Back
						</Button>
					</form>
				</Box>
			</Container>
		</Box>
	);
};

export default StepThree;
