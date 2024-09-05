import { User } from "./models/user.models";

export class UserService {
  // Function to login or create a new user
  async login(user: { email: string; password: string }) {
    const { email, password } = user;
    console.log('login service hit:', email, password)

    // Find user by email
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('user exists')
      // User exists, check password
      if (existingUser.password === password) {
        // Password matches
        console.log('password matches')
        return existingUser;
      } else {
        console.log('incorrect password')
        // Password does not match
        return false;
      }
    } else {
      // User does not exist, create new user
      console.log('create new user')
      const newUser = new User({ email, password });

      // Save the new user to the database
      await newUser.save();
      console.log('new user allegedly saved')

      // Return the newly created user
      return newUser;
    }
  }
  
  async update(user: any) {
    console.log('update service hit:', user);

    try {
      const { _id, ...updateFields } = user;

      // Find and update the user
      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, { new: true });

      if (!updatedUser) {
        throw new Error('User not found');
      }

      console.log('user updated:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }
}
