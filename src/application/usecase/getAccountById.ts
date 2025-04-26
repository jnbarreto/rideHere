import AccountRepository from "../../infra/repository/accountRepository";

export default class GetAccountId {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(accountId: string) {
    try {
      const accountData = await this.accountRepository.getAccountById(accountId);
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
    } catch (error: any) {
      console.error(error);
      throw new Error("Account Not Found");
    }
  }
}
