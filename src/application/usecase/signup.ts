import AccountRepository from "../../infra/repository/accountRepository";
import Account from "../../domain/entity/Account";

export default class Signup {
  constructor(private accountRepository: AccountRepository) {}

  async execute(input: any) {
    try {
      const isUser = await this.accountRepository.getAccountByEmail(input.email);
      if (isUser) throw new Error("User already exists");
      const account = Account.create(
        input.name,
        input.email,
        input.cpf,
        input.password,
        input.isPassenger,
        input.isDriver,
        input.carPlate
      );
      await this.accountRepository.save(account);
      const result = {
        accountId: account.getAccountId(),
      };
      return result;
    } catch (err) {
      console.error("error", err);
      throw err;
    }
  }
}
