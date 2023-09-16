import { makeStyles } from "@mui/styles";

export const useTasksStyles = makeStyles({
	tasksPaper: {
		padding: 16,
	},
	tasksList: {
		marginTop: 16,
	},
	completedTask: {
		textDecoration: "line-through",
		color: "gray",
	},
	filters: {
		marginTop: 8,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		"& > div": {
			display: "flex",
			width: "33.3333333%",
		},
		"& > div:nth-of-type(1)": {
			justifyContent: "start",
		},
		"& > div:nth-of-type(2)": {
			justifyContent: "center",
		},
		"& > div:nth-of-type(3)": {
			justifyContent: "end",
		},
	},
});
