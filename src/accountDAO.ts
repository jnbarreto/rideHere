import pgp from "pg-promise";
import Account from "./Account";
export default interface AccountDAO {
    getAccountByEmail(email: string): Promise<any>;
    save(input: any): Promise<void>;
    getAccountById(id: string): Promise<any>;
}

export default class AccountDAODataBase implements AccountDAO {

    async getAccountByEmail(email: string) {
        const connection = pgp()("postgres://postgres:123456@localhost:5434/app");
        const [accountData] = await connection.query("select * from ccca.account where email = $1", [email]);
        await connection.$pool.end();
        return accountData
    }

    async save(input: Account) {
        const connection = pgp()("postgres://postgres:123456@localhost:5434/app");
        await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [input.getAccountId(), input.getName(), input.getEmail(), input.getCpf(), input.getCarPlate(), !!input.isPassenger, !!input.isDriver, input.getPassword()]);
        await connection.$pool.end();
    }

    async getAccountById(id: string){
        const connection = pgp()("postgres://postgres:123456@localhost:5434/app");
        const [accountData] = await connection.query("select * from ccca.account where account_id = $1", [id]);
        await connection.$pool.end();
        return accountData
    }
}

export class AccountDAODataBaseMemory implements AccountDAO {
    accounts: any[];
    constructor() {
        this.accounts = [{accountId: '36070235-39f7-49c5-b219-ee5e79386856'}];
    }

    async getAccountByEmail(email: any): Promise<any> {
        return this.accounts.find((account) => account.email === email);
    }

    async save(input: any): Promise<void> {
        this.accounts.push(input)
    }

    async getAccountById(id: string): Promise<any> {
        return this.accounts.find((account:any) => account.accountId === id );
    }
}
