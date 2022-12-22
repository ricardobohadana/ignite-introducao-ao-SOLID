import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const requestUserId = request.headers.user_id as string;
      if(!requestUserId)
        return response.status(400).json({error: 'Missing user_id in request header'});
        
      const users = this.listAllUsersUseCase.execute({user_id: requestUserId});

      return response.status(200).json(users);
    } catch (error) {
      if(error instanceof Error)
        return response.status(400).json({error: error.message});
      return response.status(500).json({error: "Internal Server Error"});
    }
    
  }
}

export { ListAllUsersController };
