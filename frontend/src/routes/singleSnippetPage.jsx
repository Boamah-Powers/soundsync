import { Suspense, useState, useContext } from "react";
import {
	Await,
	useLoaderData,
	useNavigate,
	useLocation,
	useParams,
} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";
import CommentCard from "../components/CommentCard";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function SingleSnippetPage() {
	const data = useLoaderData();
	const { enqueueSnackbar } = useSnackbar();
	const [newComment, setNewComment] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const { currentUser, updateUser } = useContext(AuthContext);
	const { id: snippetId } = useParams();

	const handleAddComment = () => {
		if (newComment.trim().length < 5) {
			enqueueSnackbar("Comment must be more than 4 characters.", {
				variant: "error",
			});
			return;
		}

		if (!snippetId) {
			enqueueSnackbar(
				"Snippet ID is not available. Please try again later.",
				{ variant: "error" }
			);
			return;
		}

		const payload = { text: newComment, snippetId };

		apiRequest
			.post("/comments", payload)
			.then(() => {
				setNewComment(""); // Clear the textarea
				enqueueSnackbar("Comment added successfully", {
					variant: "success",
				});
				navigate(location.pathname, { replace: true });
			})
			.catch((error) => {
				setNewComment(""); // Clear the textarea in case of error
				console.error("Error adding comment:", error);
				enqueueSnackbar(error.response.data.message, {
					variant: "error",
				});
			});
	};

	const handleCollaborationRequest = (recipientId) => {
		if (!currentUser) {
			enqueueSnackbar(
				"You must be logged in to send a collaboration request.",
				{ variant: "error" }
			);
			return;
		}

		const payload = {
			requesterId: currentUser._id,
			recipientId,
      snippetId
		};

		apiRequest
			.post("/collaborations/request", payload)
			.then((res) => {
				// Assuming collaborations is a part of currentUser
				const updatedUser = {
					...currentUser,
					collaborations: [
						...(currentUser.collaborations || []),
						res.data.collaboration,
					],
				};

				updateUser(updatedUser);
				enqueueSnackbar("Collaboration request sent successfully!", {
					variant: "success",
				});
			})
			.catch((err) => {
				console.error("Error sending collaboration request:", err);
				enqueueSnackbar(err.response.data.message, {
					variant: "error",
				});
			});
	};

	return (
		<div className="p-4 h-full">
			<div className="p-10 flex flex-col items-center space-y-4 overflow-y-auto max-h-[calc(100vh-13rem)]">
				<Suspense fallback={<Spinner />}>
					<Await
						resolve={data.snippetResponse}
						errorElement={<p>Error loading snippet!</p>}
					>
						{(snippetData) => {
							const {
								user,
								audioUrl,
								description,
								tags,
								genre,
								comments,
								createdAt,
							} = snippetData;

							return (
								<div className="max-w-3xl w-full bg-white rounded shadow p-6">
									{/* User Information */}
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center space-x-4">
											<img
												src={
													user.profilePicture ||
													"/noavatar.png"
												}
												alt={`${user.username}'s avatar`}
												className="w-16 h-16 rounded-full"
											/>
											<div>
												<h1 className="text-2xl font-semibold">
													{user.username}
												</h1>
												<p className="text-gray-500">
													{moment(createdAt).format(
														"MMMM Do YYYY"
													)}
												</p>
											</div>
										</div>
										{/* Collaborate Button */}
										{currentUser &&
											user._id !== currentUser._id && (
												<button
													onClick={() =>
														handleCollaborationRequest(
															user._id
														)
													}
													className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
												>
													Collaborate
												</button>
											)}
									</div>

									{/* Tags and Genre */}
									<div className="flex flex-wrap gap-2 mt-2 mb-4">
										{tags.map((tag, index) => (
											<span
												key={index}
												className="bg-blue-600 text-white rounded-md px-2 py-1 text-sm"
											>
												{tag}
											</span>
										))}
										<span className="bg-green-600 text-white rounded-md px-2 py-1 text-sm">
											{genre}
										</span>
									</div>

									{/* Description */}
									<div className="mb-4">
										<h2 className="text-lg font-semibold text-gray-700 mb-2">
											Description
										</h2>
										<p className="text-gray-800">
											{description}
										</p>
									</div>

									{/* Audio Player */}
									<div className="mb-6">
										<ReactAudioPlayer
											src={audioUrl}
											controls
										/>
									</div>

									{/* Comments Section */}
									<div className="mt-6">
										<h3 className="text-lg font-semibold text-gray-700 mb-2">
											Comments
										</h3>
										<div
											className="space-y-3 overflow-y-auto max-h-64 border-t border-gray-200 pt-4"
											style={{ maxHeight: "16rem" }}
										>
											{comments.length > 0 ? (
												comments.map((comment) => (
													<CommentCard
														key={comment._id}
														comment={comment}
													/>
												))
											) : (
												<p className="text-gray-500">
													No comments yet.
												</p>
											)}
										</div>

										{/* Add Comment */}
										<div className="mt-4">
											<h4 className="text-lg font-semibold text-gray-700 mb-2">
												Add a Comment
											</h4>
											<textarea
												value={newComment}
												onChange={(e) =>
													setNewComment(
														e.target.value
													)
												}
												placeholder="Write your comment..."
												className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
												rows="4"
												minLength="5"
											></textarea>
											<button
												onClick={handleAddComment}
												className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
											>
												Submit Comment
											</button>
										</div>
									</div>
								</div>
							);
						}}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

export default SingleSnippetPage;
