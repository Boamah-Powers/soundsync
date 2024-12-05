import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    snippet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet',
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);