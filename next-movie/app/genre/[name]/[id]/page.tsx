import { MovieType } from "@/types/global";

import MovieCard from "@/components/movie";

async function fetchGenre(id: string): Promise<MovieType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		},
	);

	return (await res.json()).results;
}

export default async function Genre({
	params,
}: {
	params: Promise<{ name: string; id: string }>;
}) {
	const { name, id } = await params;
	const movies = await fetchGenre(id);

	return (
		<div>
			<h2 className="py-4 border-b mb-4 text-xl font-bold">{name}</h2>
			<div className="flex gap-2 flex-wrap">
				{movies.map(movie => {
					return (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>
		</div>
	);
}
