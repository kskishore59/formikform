import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Stepper } from "./Stepper";

type Props = {};

const StepperComponent = (props: Props) => {
	const stepDetails = useSelector((state: RootState) => state.completedSteps);
	const { stepOne, stepTwo, stepThree } = stepDetails;
	const steps = [
		{
			stepName: "stepOne",
			path: "/",
			isCompleted: stepOne,
			label: "Full Name",
		},
		{
			stepName: "stepTwo",
			path: "/step2",
			isCompleted: stepTwo,
			label: "Personal Details",
		},
		{
			stepName: "stepThree",
			path: "/step3",
			isCompleted: stepThree,
			label: "Address",
		},
	];

	return <Stepper steps={steps} />;
};

export default StepperComponent;
