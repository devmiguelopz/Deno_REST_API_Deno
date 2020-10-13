import { User } from "./user.model.ts";
export class ListCollection {
  data: Array<User>;
  constructor() {
    this.data = [];
  }

  add(user: User): ListCollection {
    this.data.push(user);
    return this;
  }

  getById(id: string): User | undefined {
    return this.data.find((user: User) => user.id === id);
  }

  update(id: string, user: User): void {
    this.data = this.data.map((item: User) =>
      item.id === id ? { ...item, ...user } : item
    );
  }

  delete(id: string): void {
    this.data = this.data.filter((item: User) => item.id !== id);
  }
}
