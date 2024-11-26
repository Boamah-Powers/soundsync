import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    snippet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
}, { timestamps: true });

export const Collaboration = mongoose.model('Collaboration', collaborationSchema);