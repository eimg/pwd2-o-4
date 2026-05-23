export default function Item({ item, remove }) {
	return (
		<li>
			{item.name}
			<button onClick={() => remove(item.id)}>Del</button>
		</li>
	);
}
