import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;
      const user = this.showUserProfileUseCase.execute({user_id});
      return response.status(200).json(user);
    } catch (error) {
      if(error instanceof Error)
        return response.status(404).json({error: error.message});
      return response.status(500).json({error: "Internal Server Error"});
    }
  }
}

export { ShowUserProfileController };
