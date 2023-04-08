import { Request, Response } from "express";
import { User } from "../entity/User";
import { UserInterface } from "../interfaces/user.interface";
import { AppDataSource } from "../db";

const UserRepository = AppDataSource.getRepository(User);

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const userData: UserInterface = req.body;
      const existingUser = await UserRepository.findOneBy({
        emailId: userData.emailId
      });
      if(existingUser) {
        res.status(500).json( {message: 'User with this email already exists'});
        return;
      }
      const user = new User(userData);
      await UserRepository.save(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findOneBy({ id: +req.params.id });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const parameters = req.query;
      const user = await UserRepository.findOneBy(parameters);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async updateUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findOneBy({ id: +req.params.id });
      const updates = req.body;
      for (let key in updates) {
        user[key] = updates[key];
      }
      await UserRepository.save(user);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async deleteUserById(req: Request, res: Response) {
    try {
      const user = await UserRepository.findOneBy({ id: +req.params.id });
      await UserRepository.remove(user);
      res.status(204).send();
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default UserController;
