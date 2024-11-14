import { MdOutlinePerson, MdDescription } from "react-icons/md";
import moment from "moment";

function CollaborationCard({ collab }) {
	return (
		<div className="flex flex-col max-w-[600px] rounded-lg shadow-lg bg-white">
			<div className="px-5 py-6">
				{/* Requester */}
				<div className="flex items-center space-x-2 mb-2">
					<MdOutlinePerson className="text-gray-500" />
					<span className="text-xl font-semibold text-black truncate">
						Requested by: {collab.requester.username}
					</span>
				</div>

				{/* Snippet Information */}
				<div className="mt-2">
					<h2 className="text-lg font-semibold text-gray-700">
						Snippet Title
					</h2>
					<p className="text-gray-800">
						{collab.snippet.title}
					</p>
				</div>

				{/* Optional Message Section */}
				{collab.message && (
					<div className="py-4">
						<h3 className="text-lg font-semibold text-gray-700 flex items-center">
							<MdDescription className="mr-2" />
							Message
						</h3>
						<p className="text-gray-800">
							{collab.message}
						</p>
					</div>
				)}

				{/* Collaboration Status and Timestamp */}
				<div className="flex justify-between items-center mt-4">
					<span
						className={`text-sm font-medium px-2 py-1 rounded ${
							collab.status === "accepted"
								? "bg-green-100 text-green-600"
								: collab.status === "declined"
								? "bg-red-100 text-red-600"
								: "bg-yellow-100 text-yellow-600"
						}`}
					>
						Status: {collab.status}
					</span>
					<span className="text-gray-500 text-sm">
						{moment(collab.createdAt).format("MMMM Do YYYY")}
					</span>
				</div>
			</div>
		</div>
	);
}

export default CollaborationCard;