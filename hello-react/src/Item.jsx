import { ListItem, ListItemText, IconButton } from "@mui/material";

import {
	Delete as DeleteIcon,
	SquareOutlined as CheckIcon,
	Check as UndoIcon,
} from "@mui/icons-material";

export default function Item({ item, remove, toggle }) {
	return (
		<ListItem>
			<IconButton
				sx={{ mr: 2 }}
				onClick={() => toggle(item.id)}>
				{item.done ? <UndoIcon color="success" /> : <CheckIcon />}
			</IconButton>
			<ListItemText primary={item.name} />
			<IconButton onClick={() => remove(item.id)}>
				<DeleteIcon color="error" />
			</IconButton>
		</ListItem>
	);
}
