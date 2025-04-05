import AccountDAO from "./accountDAO";
import Account from "./Account";

export default class Signup {
    constructor(private accountDAO: AccountDAO) {}

  async execute(input: any) {
    try {
      const isUser = await this.accountDAO.getAccountByEmail(input.email);
      if (isUser) throw new Error("User already exists");
      const account = Account.create(input.name, input.email, input.cpf, input.password, input.isPassenger, input.isDriver, input.carPlate)
      await this.accountDAO.save(account);
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
