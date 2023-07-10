import { ERROR_CODES } from "@/types";

export class UsernameStore {
  private readonly usernames: Array<{ username: string; clientId: string }> = [];

  addUser(username: string, clientId: string): void {
    if (this.userExist(username)) throw { errCode: ERROR_CODES.USER_ALREADY_IN_USE };
    this.usernames.push({ username, clientId });
  }

  getUsernameById(userId): string | null {
    if (!this.userExist(userId)) return null;
    return this.usernames.find(({ clientId: id }) => id === userId)?.username ?? null;
  }

  removeUser(clientId: string): void {
    const indexOfUser = this.usernames.findIndex(({ clientId: id }) => id === clientId);
    this.usernames.splice(indexOfUser, 1);
  }

  userExist(key: string): boolean {
    return !!this.usernames.find(({ username: user, clientId: id }) => user === key || id === key);
  }
}

export default new UsernameStore();
