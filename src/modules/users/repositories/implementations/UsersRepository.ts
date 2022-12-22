import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    user.name = name;
    user.email = email;
    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.findIndex(user => user.id === receivedUser.id);
    this.users.splice(index, 1);
    receivedUser.admin = true;
    receivedUser.updated_at = new Date();
    this.users.push(receivedUser);
    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
