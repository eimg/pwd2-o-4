export default async function Genre({
	params,
}: {
	params: Promise<{ name: string; id: string }>;
}) {
	const { name, id } = await params;

	return (
		<div>
			<h2 className="p-4 border-b mb-4 text-xl font-bold">{name}</h2>
		</div>
	);
}
