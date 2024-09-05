import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  aboutMe?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  birthdate?: Date;
  currentPage: number;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aboutMe: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  birthdate: { type: Date },
  currentPage: { type: Number, default: 2 }
});

export const User = mongoose.model<IUser>('User', UserSchema);