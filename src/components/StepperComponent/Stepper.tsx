import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import DoneIcon from "@mui/icons-material/Done";
import { LinearProgress, Typography } from "@mui/material";

interface step {
	stepName: string;
	path: string;
	isCompleted: boolean;
	label: string;
}
interface StepperProps {
	steps: step[];
}

export const Stepper = (props: StepperProps) => {
	const location = useLocation();
	const { steps } = props;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "50%",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					mr: 10,
					width: "100%",
				}}
			>
				{steps.map((each, index) => {
					const locationOne =
						location.pathname === each.path ? "white" : "skyblue";
					return (
						<>
							<Link to={each.path} style={{ textDecoration: "none" }}>
								<Box sx={{ textAlign: "center" }}>
									<ListItem
										sx={{
											backgroundColor: locationOne,
											borderRadius: "50%",
											border: "2px solid black",
										}}
										style={{ backgroundColor: locationOne }}
									>
										{each.isCompleted ? (
											<DoneIcon style={{ width: "0.7rem", height: "1.5rem" }} />
										) : (
											index + 1
										)}
									</ListItem>
								</Box>
							</Link>
							{index + 1 === steps.length ? (
								""
							) : (
								<LinearProgress
									value={100}
									sx={{ width: "100%", mr: 1, ml: 1 }}
									variant="determinate"
								/>
							)}
						</>
					);
				})}
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mt: 1,
				}}
			>
				{steps.map((each) => {
					return (
						<Typography
							key={each.label}
							sx={{
								fontWeight: "500",
								color: "#283599",
								fontFamily: "Gill Sans, sans-serif",
							}}
						>
							{each.label}
						</Typography>
					);
				})}
			</Box>
		</Box>
	);
};

export {};
