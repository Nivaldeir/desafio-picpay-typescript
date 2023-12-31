import { UserRepository } from "../../repository/UserRepository";

export class GetAllUser {
    constructor(private readonly userService: UserRepository) { }
    async execute() {
        return await this.userService.list({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                document: true,
                email: true,
                balance: true,
                usertype: true,
                password: false,
            }
        });
    }
}