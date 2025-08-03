import CarPlate from "../valueObject/carPlate";
import CPF from "../valueObject/CPF";
import Email from "../valueObject/Email";
import Name from "../valueObject/Name";
import Password, { PasswordFactory } from "../valueObject/Password";
import UUID from "../valueObject/UUID";

export default class Account {
  private accountId: UUID;
  private email: Email;
  private name: Name;
  private cpf: CPF;
  private carPlate?: CarPlate;
  private password: Password;

  constructor(
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    password: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean,
    carPlate: string,
    passwordType: string = 'textplain'
  ) {
    this.accountId = new UUID(accountId);
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new CPF(cpf);
    this.password = PasswordFactory.restore(passwordType, password);
    if (isDriver) this.carPlate = new CarPlate(carPlate);
  }

  static create(
    name: string,
    email: string,
    cpf: string,
    password: string,
    isPassenger: boolean,
    isDriver: boolean,
    carPlate?: string,
    passwordType: string = 'textplain'
  ) {
    const accountId = UUID.create();
    const passwordValue = PasswordFactory.create(passwordType, password);
    return new Account(
      accountId.getValue(),
      name,
      email,
      cpf,
      passwordValue.getValue(),
      isPassenger,
      isDriver,
      carPlate as string,
      passwordType
    );
  }

  getAccountId() {
    return this.accountId.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getCpf() {
    return this.cpf.getValue();
  }

  getCarPlate() {
    return this.carPlate?.getValue() || "";
  }

  getPassword() {
    return this.password.getValue();
  }

  getPasswordType() {
    return this.password.type;
  }
}
