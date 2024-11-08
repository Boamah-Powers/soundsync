import SearchBar from "../components/SearchBar";
import MusicCard from "../components/MusicCard";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function HomePage() {
	const data = useLoaderData();
	console.log(data);
	const musicList = [
		{
			name: "olanetsoft",
			tags: ["jazz", "smooth"],
			description:
				"An unthinkable thing to be done to humans To make the description section scrollable while keeping the rest of the layout fixed, you can use overflow-y-auto along with a max-h constraint. This will allow the description to scroll within a set height, while other elements remain unaffected.",
			title: "Bang Bang",
			url: "https://res.cloudinary.com/demo/video/upload/dog.mp3",
			created_at: "2021-10-04T23:30:01.000Z",
		},
		{
			name: "olanetsoft",
			tags: ["jazz", "smooth"],
			description:
				"An unthinkable thing to be done to humans To make the description section scrollable while keeping the rest of the layout fixed, you can use overflow-y-auto along with a max-h constraint. This will allow the description to scroll within a set height, while other elements remain unaffected.",
			title: "Bang Bang",
			url: "https://res.cloudinary.com/demo/video/upload/dog.mp3",
			created_at: "2021-10-04T23:30:01.000Z",
		},
		{
			name: "olanetsoft",
			tags: ["jazz", "smooth"],
			description:
				"An unthinkable thing to be done to humans To make the description section scrollable while keeping the rest of the layout fixed, you can use overflow-y-auto along with a max-h constraint. This will allow the description to scroll within a set height, while other elements remain unaffected.",
			title: "Bang Bang",
			url: "https://res.cloudinary.com/demo/video/upload/dog.mp3",
			created_at: "2021-10-04T23:30:01.000Z",
		},
	];

	return (
		<div className="p-4 h-full">
			<SearchBar />
			<div className="p-10 flex flex-col items-center space-y-4 overflow-y-auto max-h-[calc(100vh-13rem)]">
				<Suspense fallback={<p>Loading...</p>}>
					<Await
						resolve={data.snippetResponse}
						errorElement={<p>Error loading snippets!</p>}
					>
						{(snippetResponse) => {
							// Extract desired properties from each snippet
							const transformedResponse = snippetResponse.map(
								(m) => {
									const {
										user: { username },
										tags,
										description,
										audioUrl,
										createdAt,
									} = m;
									return {
										name: username,
										tags,
										description,
										url: audioUrl,
										created_at: createdAt,
									};
								}
							);

							return transformedResponse.map((m, index) => (
								<MusicCard musicList={m} key={index} />
							));
						}}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default HomePage;
