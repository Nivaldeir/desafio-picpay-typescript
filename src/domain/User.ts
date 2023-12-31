import { UserType } from "@prisma/client";
import { v4 } from "uuid";
import { Email } from "./Email";
import Document from "./Document";

interface IUserConstructor {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  document: string;
  balance: any;
  usertype: UserType;
  password: string;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  document: Document;
  email: Email;
  password: string;
  balance: any;
  usertype: UserType;

  constructor(params: IUserConstructor) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.balance = params.balance;
    this.document = new Document(params.document);
    this.usertype = params.usertype;
    this.email = new Email(params.email);
    this.password = params.password;
  }

  static create(params: Omit<IUserConstructor, "id">) {
    return new User({ ...params, id: v4() });
  }

  get() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      balance: this.balance,
      document: this.document.value,
      email: this.email.value,
      usertype: this.usertype,
      password: this.password,
    }
  }
}

