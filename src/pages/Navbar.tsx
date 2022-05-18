import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Popover, Box } from "@mui/material";
import { auth } from "../config/firebase";
import logging from "../config/logging";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { logoutOption, reset } from "../store/rootSlice";

type Props = {};

const Navbar = (props: Props) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const dispatch: AppDispatch = useDispatch();
	const history = useNavigate();
	const logout = () => {
		dispatch(reset());
		dispatch(logoutOption());
		console.log("logged out");
		auth
			.signOut()
			.then(() => history("/login"))
			.catch((error) => logging.error(error));
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<img
						style={{ height: "40px", width: "50px" }}
						src="https://res.cloudinary.com/joinditto-in/image/upload/v1647523910/ditto_log_iqxxha.png"
						alt="logo"
					/>
				</Typography>
				<Button
					variant="outlined"
					style={{
						color: "black",
						marginRight: "20px",
						backgroundColor: "white",
					}}
					onClick={handleClick}
				>
					LOGOUT
				</Button>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
				>
					<Box
						sx={{ p: 3, mr: 6, pr: 5 }}
						width={"100%"}
						style={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<Typography>Are you sure you want to logout?</Typography>
						<Box>
							<Button
								variant="outlined"
								style={{ marginRight: "10px", backgroundColor: "#596af0" }}
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								variant="outlined"
								style={{ marginRight: "10px" }}
								onClick={() => logout()}
							>
								Logout
							</Button>
						</Box>
					</Box>
				</Popover>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
