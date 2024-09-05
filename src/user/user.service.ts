import { User } from "./models/user.models";

export class UserService {
  async login(user: { email: string; password: string }) {
    const { email, password } = user;
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

  async readAll() {
    try {
      const foundUsers = await User.find();

      if (!foundUsers) {
        throw new Error('No users found!');
      }

      const usersWithoutPasswords = foundUsers.map(user => {
        const userObj = user.toObject();
        const { password, ...userWithoutPassword } = userObj;
        return userWithoutPassword;
      });

      return usersWithoutPasswords;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}