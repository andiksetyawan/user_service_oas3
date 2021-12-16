// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { IUserService } from "src/controllers/user";
import { User } from "src/entities/user";
import { DeleteResult, InsertResult } from "typeorm";

export interface IUserRepo {
  findByName(firstName: string, lastName: string): any;
  getUserByID(id: number): Promise<User>;
  getUsers(limit: string, offset: string): Promise<User[]>;

  createUser(user: User): Promise<InsertResult>;
  updateUserByID(user: User): Promise<User>;
  deleteUserByID(id: number): Promise<DeleteResult>;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepo;

  public constructor(userRepository: IUserRepo) {
    this.userRepository = userRepository;
  }

  deleteUserByID(id: number): Promise<DeleteResult> {
    return this.userRepository.deleteUserByID(id);
  }

  getUserByID(id: number): Promise<User> {
    return this.userRepository.getUserByID(id);
  }

  getUsers(limit: string, offset: string): Promise<User[]> {
    return this.userRepository.getUsers(limit, offset);
  }

  updateUserByID(user: User): Promise<User> {
    return this.userRepository.updateUserByID(user);
  }

  async createUser(user: User): Promise<User> {
    const res = await this.userRepository.createUser(user);
    // TODO get from db //find by userid repo
    const newUser = user;
    newUser.id = res.raw;
    return newUser;
  }
}
