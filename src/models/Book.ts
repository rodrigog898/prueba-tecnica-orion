import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IBook extends Document {
  _id: Types.ObjectId;   
  id: string;            
  title: string;
  chapters: number;
  pages: number;
  authors: string[];     
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    id:       { type: String, unique: true, default: uuidv4 },
    title:    { type: String, required: true },
    chapters: { type: Number, required: true },
    pages:    { type: Number, required: true },
    authors:  [{ type: String, required: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});
bookSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
