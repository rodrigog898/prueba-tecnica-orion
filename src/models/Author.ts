import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IAuthor extends Document {
  _id: Types.ObjectId;  
  id: string;            
  name: string;
  books: string[];       
  createdAt: Date;
  updatedAt: Date;
}

const authorSchema = new Schema<IAuthor>(
  {
    id:    { type: String, unique: true, default: uuidv4 },
    name:  { type: String, required: true },
    books: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
authorSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});
authorSchema.set('toObject', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

export const Author = mongoose.model<IAuthor>('Author', authorSchema);
