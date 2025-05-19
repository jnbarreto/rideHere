import Account from "../../domain/entity/Account";
import { inject } from "../DI/Registry";
import DatabaseConnection from "../database/DatabaseConnection";
export default interface AccountRepository {
  getAccountByEmail(email: string): Promise<Account | undefined>;
  save(input: any): Promise<void>;
  getAccountById(id: string): Promise<Account | undefined>;
}

export class AccountRepositoryDB implements AccountRepository {
  @inject("databaseConnection")
  connection?: DatabaseConnection;

  async getAccountByEmail(email: string) {
    const [accountData] = await this.connection?.query(
      "select * from ccca.account where email = $1",
      [email]
    );
    if (!accountData) return;
    return new Account(
      accountData.account_id,
      accountData.name,
      accountData.email,
      accountData.cpf,
      accountData.password,
      accountData.is_passenger,
      accountData.is_driver,
      accountData.car_plate
    );
  }

  async save(input: Account) {
    await this.connection?.query(
      "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        input.getAccountId(),
        input.getName(),
        input.getEmail(),
        input.getCpf(),
        input.getCarPlate(),
        !!input.isPassenger,
        !!input.isDriver,
        input.getPassword(),
      ]
    );
  }

  async getAccountById(id: string) {
    const [accountData] = await this.connection?.query(
      "select * from ccca.account where account_id = $1",
      [id]
    );
    if (!accountData) return;
    return new Account(
      accountData.account_id,
      accountData.name,
      accountData.email,
      accountData.cpf,
      accountData.password,
      accountData.is_passenger,
      accountData.is_driver,
      accountData.car_plate
    );
  }
}

export class AccountDAODataBaseMemory implements AccountRepository {
  accounts: any[];
  constructor() {
    this.accounts = [{ accountId: "36070235-39f7-49c5-b219-ee5e79386856" }];
  }

  async getAccountByEmail(email: any): Promise<any> {
    return this.accounts.find((account) => account.email === email);
  }

  async save(input: any): Promise<void> {
    this.accounts.push(input);
  }

  async getAccountById(id: string): Promise<any> {
    return this.accounts.find((account: any) => account.accountId === id);
  }
}
