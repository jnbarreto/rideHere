import crypto from 'crypto';
const regex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/

export default abstract class Password {
    protected password!: string;
    abstract type:string;

    constructor(password: string, operation: string) {
        if (!regex.test(password)) throw new Error("Invalid Password")
        if (operation === 'create') this.password = this.encrypt(password);
        if(operation === 'restore') this.password = password;
    }

    abstract encrypt(password: string): string;
    abstract isValid(password: string): boolean;

    getValue() {
        return this.password
    }
}

export class TextPlainPassword extends Password {
    type = "textplain"

    encrypt(password: string): string {
        return password
    }

    isValid(password: string): boolean {
        return this.password === password;
    }
}

export class MD5Password extends Password {
    type = "md5"

    encrypt(password: string): string {
        return crypto.createHash("md5").update(password).digest("hex")
    }

    isValid(password: string): boolean {
        return this.password === crypto.createHash("md5").update(password).digest("hex");
    }
}

export class SHA1Password extends Password {
    type = "sha1"

    encrypt(password: string): string {
        return crypto.createHash("sha1").update(password).digest("hex")
    }

    isValid(password: string): boolean {
        return this.password === crypto.createHash("sha1").update(password).digest("hex");
    }
}

export class PasswordFactory {
    static build (type:string, password: string, operation: string) {
        if (type === 'textplain') return new TextPlainPassword(password, operation);
        if(type === "md5") return new MD5Password(password, operation);
        if(type === "sha1") return new SHA1Password(password, operation);
        throw new Error("");
    }

    static create (type: string, password: string) {
        return PasswordFactory.build(type, password, 'create');
    }

    static restore (type: string, password: string) {
        return PasswordFactory.build(type, password, 'restore');
    }
}