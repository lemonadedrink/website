import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        published: {
            type: Number,
            required: true
        },
    }
);

export const Book = mongoose.model('Book', bookSchema);