import { User } from "./models/user.models";

export class UserService {
  // Function to login or create a new user
  async login(user: { email: string; password: string }) {
    const { email, password } = user;

    // Find user by email
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.password === password) {
        const { password, ...userWithoutPassword } = existingUser.toObject();
        return userWithoutPassword;
      } else {
        return false;
      }
    } else {
      const newUser = new User({ email, password });
      await newUser.save();
      const { password: newPassword, ...newUserWithoutPassword } = newUser.toObject();
      return newUserWithoutPassword;
    }
  }
  
  async update(user: any) {
    try {
      const { _id, ...updateFields } = user;
      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

      if (!updatedUser) {
        throw new Error('User not found');
      }
      const { password, ...updatedUserWithoutPassword } = updatedUser.toObject();
      return updatedUserWithoutPassword;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }
}