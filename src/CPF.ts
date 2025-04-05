const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

export default class CPF {
    private cpf: string;
    constructor(cpf: string) {
        if (!this.validateCpf(cpf)) throw new Error("Invalid CPF")
        this.cpf = cpf;
    }

    validateCpf (cpf: string) {
        cpf = cpf.replace(/\D/g, "");
        if (this.validateCpfSize(cpf)) return false;
        if (this.allDigitsTheSame(cpf)) return false;
        const digit1 = this.calculateDigit(cpf, FIRST_DIGIT_FACTOR);
        const digit2 = this.calculateDigit(cpf, SECOND_DIGIT_FACTOR);
        return `${digit1}${digit2}` === this.extractDigit(cpf);
    }

    validateCpfSize (cpf : string) {
        return (cpf.length !== 11)
    }

    allDigitsTheSame (cpf: string) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }

    calculateDigit (cpf: string, factor: number) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const remainder = total % 11;
        return (remainder < 2) ? 0 : 11 - remainder;
    }

    extractDigit (cpf: string) {
        return cpf.slice(9);
    }

    getValue() {
        return this.cpf
    }

}