import CarPlate from "./carPlate";
import CPF from "./CPF";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";
import UUID from "./UUID";

export default class Account {
    private accountId: UUID;
    private email: Email;
    private name: Name;
    private cpf: CPF;
    private carPlate?: CarPlate;
    private password: Password;

    constructor(accountId: string,  name: string, email: string, cpf: string, password: string, readonly isPassenger: boolean, readonly isDriver: boolean, carPlate: string) {
        this.accountId = new UUID(accountId);
        this.name = new Name(name);
        this.email = new Email(email);
        this.cpf = new CPF(cpf);
        this.password = new Password(password);
        if (isDriver) this.carPlate = new CarPlate(carPlate);
    }

    static create(name: string, email: string, cpf: string, password: string, isPassenger: boolean, isDriver: boolean, carPlate: string){
        const accountId = UUID.generateUUID();
        return new Account(accountId.getValue(), name, email, cpf, password, isPassenger, isDriver, carPlate);
    }

    getAccountId() {
        return this.accountId.getValue();
    }

    getName () {
		return this.name.getValue();
	}

	getEmail () {
		return this.email.getValue();
	}

	getCpf () {
		return this.cpf.getValue();
	}

	getCarPlate () {
		return this.carPlate?.getValue() || "";
	}

	getPassword () {
		return this.password.getValue();
	}
}