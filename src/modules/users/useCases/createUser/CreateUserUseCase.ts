import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const isEmailRegistered = this.usersRepository.findByEmail(email);
    if(isEmailRegistered)
      throw new Error("Email is already registered");
    const user = this.usersRepository.create({name, email});
    return user;
  }
}

export { CreateUserUseCase };
