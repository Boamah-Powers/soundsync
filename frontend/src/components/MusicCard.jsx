import ReactAudioPlayer from "react-audio-player";
import { MdOutlineMessage } from "react-icons/md";
import moment from "moment";

function MusicCard({ musicList, index }) {
	return (
		<div className="flex flex-col max-w-[600px] rounded-lg shadow-lg bg-white">
			<div className="px-5 py-6">
				{/* Username */}
				<h1 className="text-3xl text-black truncate text-left">
					{musicList.name}
				</h1>
				<span className="text-gray-500 text-sm">
					{moment(musicList.created_at).format("MMMM Do YYYY")}
				</span>

				{/* Tags Aligned Left */}
				<div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto max-w-full justify-start mt-4">
					{musicList.tags.map((tag, index) => (
						<div
							className="bg-blue-600 text-white rounded-md px-2 py-1 text-sm whitespace-nowrap"
							key={index}
						>
							{tag}
						</div>
					))}
				</div>

				{/* Description Section with Label */}
				<div className="py-5 w-full">
					<h2 className="text-lg font-semibold text-gray-700 mb-2 text-left">
						Description
					</h2>
					<div className="relative max-h-[100px] overflow-y-auto p-3 border rounded bg-gray-50">
						<pre className="whitespace-pre-wrap break-words text-gray-800">
							{musicList.description}
						</pre>
					</div>
				</div>

				{/* Audio Player and Comments Row */}
				<div className="flex items-center justify-between w-full px-5 py-3">
					{/* Audio Player */}
					<div className="m-2">
						<ReactAudioPlayer src={`${musicList.url}`} controls />
					</div>

					{/* Comments Button */}
					<button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400">
						<MdOutlineMessage className="h-5 w-5" />
						<span>Comments</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default MusicCard;