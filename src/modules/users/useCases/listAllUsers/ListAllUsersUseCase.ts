import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requestUser = this.usersRepository.findById(user_id);
    if(!requestUser)
      throw new Error("This user does not exist");
    if(!requestUser.admin)
      throw new Error("This user is not an admin user");

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
