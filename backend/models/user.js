import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
     },
    instruments: [{
        type: String,
        required: true,
    }],
    genres: [{
        type: String,
        required: true,
    }],
    profilePicture: {
        type: String, // URL for the profile picture
    },
    snippets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Snippet',
    }],
    collaborations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collaboration',
    }],
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);
export const User = mongoose.model('User', userSchema);