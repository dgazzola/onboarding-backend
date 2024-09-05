import { Admin } from "./models/admin.models";

export class AdminService {
  async read() {
    let admin = await Admin.findOne();

    if (!admin) {
      admin = new Admin({
        aboutme: 3,
        address: 2,
        birthdate: 2,
      });
      await admin.save();
    }

    return admin;
  }

  async update(updates: any) {
    try {
      const { _id, ...updateData } = updates;
      const updatedAdmin = await Admin.findByIdAndUpdate(
        _id,
        updateData,
        { new: true }
      );

      return updatedAdmin;
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  }
}
