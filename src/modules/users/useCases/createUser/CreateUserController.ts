import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const {email, name} = request.body;
      const user = this.createUserUseCase.execute({email, name});
      
      return response.status(201).json(user);
    } catch (error) {
      if(error instanceof Error)
        return response.status(400).json({error: error.message});
      return response.status(500).json({error: "Internal Server Error"});
    }
  }
}

export { CreateUserController };
