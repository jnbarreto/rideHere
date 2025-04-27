import AccountRepository from "../../infra/repository/accountRepository";
import Account from "../../domain/entity/Account";
import MailerGateway from "../../infra/gateway/MaillerGateway";
import { inject } from "../../infra/DI/Registry";

export default class Signup {
  @inject("accountRepository")
  accountRepository?: AccountRepository;
  @inject("mailerGateway")
  mailerGateway?: MailerGateway;


  async execute(input: any) {
    try {
      const isUser = await this.accountRepository?.getAccountByEmail(input.email);
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
      await this.accountRepository?.save(account);
      await this.mailerGateway?.send(account.getEmail(),"Welcome!", `Congratulations ${account.getName()}`)
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
