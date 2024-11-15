import SearchBar from "../components/SearchBar";
import MusicCard from "../components/MusicCard";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

function HomePage() {
	const data = useLoaderData();

	return (
		<div className="p-4 h-full">
			<SearchBar />
			<div className="p-10 flex flex-col items-center space-y-4 overflow-y-auto max-h-[calc(100vh-13rem)]">
				<Suspense fallback={<Spinner/>}>
					<Await
						resolve={data.snippetResponse}
						errorElement={<p>Error loading snippets!</p>}
					>
						{(snippetResponse) => {
							// Extract desired properties, including _id
							const transformedResponse = snippetResponse.map(
								(m) => {
									const {
										_id,
										user: { username },
										tags,
										description,
										audioUrl,
										createdAt,
									} = m;
									return {
										id: _id,
										name: username,
										tags,
										description,
										url: audioUrl,
										created_at: createdAt,
									};
								}
							);

							return transformedResponse.map((m, index) => (
								<MusicCard musicList={m} index={m.id}key={index} /> // Use m.id as the key
							));
						}}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default HomePage;
