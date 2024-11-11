export class TestService {
  async readAll() {
    try {
      const foundUsers = [{ name: 'John Doe', email: 'testEmail1'}, { name: 'Jane Doe', email: 'testEmail2'}];
      return foundUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}