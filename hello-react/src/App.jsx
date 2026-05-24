import { useState, useRef } from "react";

import Item from "./Item";
import Header from "./Header";

import {
	Container,
	List,
	OutlinedInput,
	IconButton,
	Divider,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

export default function App() {
	const inputRef = useRef();

	const [data, setData] = useState([
		{ id: 3, name: "Bread", done: false },
		{ id: 2, name: "Butter", done: true },
		{ id: 1, name: "Banana", done: false },
	]);

	const addItem = () => {
		const id = data[0] ? data[0].id + 1 : 1;
		const name = inputRef.current.value;

		setData([{ id, name, done: false }, ...data]);
	};

	const delItem = id => {
		setData(data.filter(item => item.id != id));
	};

	const toggle = id => {
		setData(
			data.map(item => {
				if (item.id == id) item.done = !item.done;
				return item;
			}),
		);
	};

	return (
		<div>
			<Header count={data.filter(item => !item.done).length} />

			<Container
				maxWidth="sm"
				sx={{ mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();
						addItem();
						e.currentTarget.reset();
					}}>
					<OutlinedInput
						fullWidth
						type="text"
						inputRef={inputRef}
						endAdornment={
							<IconButton type="submit">
								<AddIcon />
							</IconButton>
						}
					/>
				</form>
				<List>
					{data
						.filter(item => !item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={delItem}
									toggle={toggle}
								/>
							);
						})}
				</List>

				<Divider />

				<List>
					{data
						.filter(item => item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={delItem}
									toggle={toggle}
								/>
							);
						})}
				</List>
			</Container>
		</div>
	);
}
