import { useState, useRef } from "react";

import Item from "./Item";
import Header from "./Header";

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
    }

    const delItem = id => {
        setData(data.filter(item => item.id != id));
    }

	return (
		<div>
			<Header count={data.length} />
            
			<form onSubmit={e => {
                e.preventDefault();
                addItem();
                e.currentTarget.reset();
            }}>
                <input type="text" ref={inputRef} />
				<button type="submit">Add</button>
			</form>
			<ul>
				{data.map(item => {
					return (
						<Item
							key={item.id}
							item={item}
                            remove={delItem}
						/>
					);
				})}
			</ul>
		</div>
	);
}
