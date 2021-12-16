import { DeleteResult, EntityRepository, InsertResult, Repository } from "typeorm";
import { IUserRepo } from "../services/user";
import { User } from "../entities/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepo {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }

  deleteUserByID(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }

  getUserByID(id: number): Promise<User> {
    return this.findOne(id);
  }

  getUsers(limit: string, offset: string): Promise<User[]> {
    return this.find({
      order: {
        id: "DESC",
      },
      skip: Number(offset),
      take: Number(limit),
    });
  }

  updateUserByID(user: User): Promise<User> {
    return this.save(user);
  }

  createUser(user: User): Promise<InsertResult> {
    return this.insert(user);
  }
}
