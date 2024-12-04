import PropTypes from "prop-types";
import moment from "moment";

function CommentCard({ comment }) {
  const { user, text, createdAt } = comment;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm w-full max-w-md">
      {/* User Information */}
      <div className="flex items-center space-x-3 mb-2">
        <img
          src={user.profilePicture || "/noavatar.png"}
          alt={`${user.username}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <span className="text-gray-500 text-sm">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Comment Text */}
      <div className="mt-2">
        <p className="text-gray-800">{text}</p>
      </div>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
    }).isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
