import mongoose, { Schema, Document } from 'mongoose';


type ValidPageNumber = 2 | 3;

export interface IAdmin extends Document {
  aboutMe: ValidPageNumber;
  address: ValidPageNumber;
  birthdate: ValidPageNumber;
}

const AdminSchema: Schema = new Schema({
  aboutme: { 
    type: Number, 
    enum: [2, 3],
    required: true
  },
  address: { 
    type: Number, 
    enum: [2, 3],
    required: true 
  },
  birthdate: { 
    type: Number, 
    enum: [2, 3],
    required: true 
  }
});

export const Admin = mongoose.model<IAdmin>('settings', AdminSchema);