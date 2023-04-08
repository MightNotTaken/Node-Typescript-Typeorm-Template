import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emailId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  mobileNumber: string;

  @Column()
  street: string;

  @Column()
  state: string;

  @Column()
  city: string;

  constructor(body: Partial<UserInterface>) {
    this.emailId = body.emailId;
    this.password = body.password;
    this.name = body.name;
    this.mobileNumber = body.mobileNumber;
    this.street = body.street;
    this.state = body.state;
    this.city = body.city;
  }
}