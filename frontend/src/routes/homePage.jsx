import SearchBar from "../components/SearchBar";
import MusicCard from "../components/MusicCard";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useContext } from "react";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const data = useLoaderData();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="p-4 h-full">
      <SearchBar />
      <div className="p-10 flex flex-col items-center space-y-4 overflow-y-auto max-h-[calc(100vh-13rem)]">
        <Suspense fallback={<Spinner />}>
          <Await
            resolve={data.snippetResponse}
            errorElement={<p>Error loading snippets!</p>}
          >
            {(snippetResponse) => {
              // Extract desired properties, including _id
              const transformedResponse = snippetResponse.map((m) => {
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
              });

              // Check if there are no snippets
              if (transformedResponse.length === 0) {
                return (
                  <p className="text-gray-500 italic">
                    No snippets available. Add some to get started!
                  </p>
                );
              }

              // Render MusicCard components
              return transformedResponse.map((m, index) => (
                <MusicCard
                  musicList={m}
                  index={m.id}
                  key={index}
                  username={currentUser ? currentUser.username : ""}
                />
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default HomePage;
