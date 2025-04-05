import AccountDAO from "./accountDAO";

export default class GetAccountId {
    constructor(readonly accountDAO: AccountDAO) {

    }

    async execute (accountId: string) {
        try {
            const accountData = await this.accountDAO.getAccountById(accountId);
            return accountData;
        } catch (error: any) {
            console.error(error);
            throw new Error("Account Not Found");
        }
    }
}