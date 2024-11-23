import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    audioUrl: {
        type: String,
        required: true, // URL to the audio file
    },
    public_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [{
        type: String,
        required: true,
    }],
    genre: {
        type: String,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, { timestamps: true });

export const Snippet = mongoose.model('Snippet', snippetSchema);