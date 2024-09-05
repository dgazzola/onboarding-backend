import { Admin } from "./models/admin.models";

export class AdminService {
  // Function to login or create a new user
  async read() {

    // Find user by email
    const admin = await Admin.findOne();
    // console.log('service found admin:', admin)
    return admin
  }
  async update(updates: any) { // Consider typing this parameter for better type safety
    try {
      // Extract the ID from the updates object
      const { _id, ...updateData } = updates;
      console.log('_id:', _id, 'updateData:', updateData)

      // Find and update the document by its ID
      const updatedAdmin = await Admin.findByIdAndUpdate(
        _id, // ID of the document to update
        updateData, // Fields to update
        { new: true } // Return the updated document
      );
      console.log('service updated admin:', updatedAdmin)

      return updatedAdmin;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }
}
