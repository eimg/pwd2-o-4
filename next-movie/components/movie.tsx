import { MovieType } from "@/types/global";

const poster = "http://image.tmdb.org/t/p/w185";

export default async function MovieCard({ movie }: { movie: MovieType }) {
    return (
		<div className="w-46 border rounded">
			<img
				src={poster + movie.poster_path}
				alt=""
			/>
			<div className="p-2">
				<b>{movie.title}</b>
				<div>{movie.release_date.split("-")[0]}</div>
			</div>
		</div>
	);
}