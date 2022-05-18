import {
	Box,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Slider } from "@material-ui/core";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useFormik } from "formik";
import moment from "moment";
import StepperComponent from "../components/StepperComponent/StepperComponent";
import IPageProps from "../interfaces/page";
import { steps, updateDetails } from "../store/rootSlice";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "./Navbar";
import { FormatItalicTwoTone } from "@mui/icons-material";

const StepTwoPage: React.FunctionComponent<IPageProps> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const details = useSelector((state: RootState) => state);
	const { firstName, lastName, dob, gender, phoneNumber, annualIncome } =
		details.yourDetails;
	const { email } = details.auth;
	const validationSchema = Yup.object().shape({
		gender: Yup.string()
			.required("Please Select Gender")
			.oneOf(["male", "female", "others"]),
		annualIncome: Yup.number()
			.required("Please Select Annual Income")
			.min(1, "Please Select Annual Income of more than 1")
			.typeError("Please select your Annual Income"),
		dob: Yup.string()
			.required("Please select Date of birth")
			.typeError("Please enter valid date")
			.test("DOB", "Must be greater than 18 years", (value) => {
				return moment().diff(moment(value), "years") >= 18;
			}),
		phoneNumber: Yup.string()
			.min(10, "Please Enter Valid Number")
			.max(10, "Phone number should be 10 characters")
			.required("Please enter your phone number")
			.typeError("Must be only numbers from 0-9"),
	});

	// const { handleSubmit, control } = useForm<Step2>({
	// 	resolver: yupResolver(validationSchema),
	// 	defaultValues: { dob, gender, phoneNumber, annualIncome },
	// });
	const push = useNavigate();

	const formik = useFormik({
		initialValues: {
			dob,
			gender,
			phoneNumber,
			annualIncome,
		},
		validationSchema: validationSchema,
		onSubmit: (data) => {
			console.log(data);
			dispatch(updateDetails(data));
			dispatch(steps({ stepTwo: true }));
			console.log(details);
			push("/step3");
		},
	});

	useEffect(() => {
		if (!firstName || !lastName) {
			push("/");
		}
	});

	const onClickBack = () => {
		push("/");
	};

	// const onSubmit: SubmitHandler<Step2> = (data) => {
	// 	console.log(data);
	// 	dispatch(updateDetails(data));
	// 	dispatch(steps({ stepTwo: true }));
	// 	push("/step3");
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
				<Box sx={{ mt: 2, p: 2, width: "40%" }}>
					<form onSubmit={formik.handleSubmit}>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DesktopDatePicker
								views={["year", "month", "day"]}
								label={"Date of Birth"}
								inputFormat="MM/dd/yyyy"
								maxDate={new Date("2022-04-08")}
								value={formik.values.dob}
								onChange={(newValue) => {
									formik.setFieldValue(
										"dob",
										moment(newValue).utc().format("YYYY-MM-DD"),
									);
								}}
								renderInput={(params) => (
									<TextField
										autoFocus
										fullWidth
										{...params}
										helperText={formik.touched.dob && formik.errors.dob}
									/>
								)}
							/>
						</LocalizationProvider>
						<TextField
							fullWidth
							id="phoneNumber"
							name="phoneNumber"
							type="text"
							style={{ marginTop: "2rem" }}
							label="Phone Number"
							value={formik.values.phoneNumber}
							onChange={formik.handleChange}
							helperText={
								formik.touched.phoneNumber && formik.errors.phoneNumber
							}
						/>
						<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
						<Box>
							<RadioGroup
								onChange={(e, value) => formik.setFieldValue("gender", value)}
								aria-labelledby="demo-radio-buttons-group-label"
								name="gender"
								row
								value={formik.values.gender}
								sx={{ ml: 1, mt: 1, mb: 2 }}
							>
								<FormControlLabel
									value="female"
									control={<Radio />}
									label="Female"
								/>
								<FormControlLabel
									value="male"
									control={<Radio />}
									label="Male"
								/>
								<FormControlLabel
									value="others"
									control={<Radio />}
									label="Others"
								/>
							</RadioGroup>
							{formik.errors.gender ? (
								<p
									style={{
										color: "#d32f2f",
										fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
										fontSize: "12px",
										marginLeft: "15px",
									}}
								>
									{formik.touched.gender && formik.errors.gender}
								</p>
							) : (
								""
							)}
						</Box>
						<FormLabel htmlFor="customRange2">Annual Income (LPA) : </FormLabel>
						<>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<Typography
									sx={{
										mr: 2,
										backgroundColor: "skyblue",
										p: 1.5,
										width: "1rem",
									}}
								>
									{" "}
									0
								</Typography>
								<Slider
									valueLabelDisplay="auto"
									aria-labelledby="annualIncome"
									name="annualIncome"
									value={formik.values.annualIncome}
									onChange={(e, newIncome) =>
										formik.setFieldValue("annualIncome", newIncome)
									}
									min={0}
									max={50}
								/>

								<Typography
									sx={{
										ml: 2,
										backgroundColor: "skyblue",
										p: 1.5,
										width: "1rem",
									}}
								>
									50
								</Typography>
							</Box>
							{formik.errors.annualIncome ? (
								<Typography
									style={{
										color: "#d32f2f",
										fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
										fontSize: "12px",
										marginLeft: "15px",
									}}
								>
									{formik.touched.annualIncome && formik.errors.annualIncome}
								</Typography>
							) : (
								""
							)}
						</>
						<div>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								style={{ marginBottom: 15, marginTop: 10 }}
							>
								Next
							</Button>
							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={onClickBack}
							>
								Back
							</Button>
						</div>
					</form>
				</Box>
			</Container>
		</Box>
	);
};

export default StepTwoPage;
