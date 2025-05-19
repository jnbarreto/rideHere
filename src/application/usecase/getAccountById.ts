import { inject } from "../../infra/DI/Registry";
import AccountRepository from "../../infra/repository/accountRepository";

export default class GetAccountId {
 @inject("accountRepository")
 accountRepository?: AccountRepository;

  async execute(accountId: string) {
    const accountData = await this.accountRepository?.getAccountById(accountId);
    if (!accountData) throw new Error("Account Not Found");
    return {
      accountId: accountData?.getAccountId(),
      name: accountData?.getName(),
      email: accountData?.getEmail(),
      cpf: accountData?.getCpf(),
      carPlate: accountData?.getCarPlate(),
      password: accountData?.getPassword(),
      isPassenger: accountData?.isPassenger,
      isDriver: accountData?.isDriver,
    };
  }
}
