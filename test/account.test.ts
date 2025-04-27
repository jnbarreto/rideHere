import Account from "../src/domain/entity/Account"

describe("Account",() => {
    test("Deve criar uma conta válida", async() => {
        const account = Account.create("jhon Doe", `jhonDoe${Math.random()}@gmail.com`, "158.276.650-96", "Jhon@123", true, false, "")
        expect(account).toBeDefined()
    })
    test("Não deve criar uma conta com nome inválido", async() => {
        expect(() => Account.create("jhon", `jhonDoe${Math.random()}@gmail.com`, "158.276.650-96", "Jhon@123", true, false, "")).toThrow("Invalid Name")
    })
    test("Não deve criar uma conta com email inválido", async() => {
        expect(() => Account.create("jhon Doe", `jhonDoe${Math.random()}`, "158.276.650-96", "Jhon@123", true, false, "")).toThrow("Invalid Email")
    })
    test("Não deve criar uma conta com cpf inválido", async() => {
        expect(() => Account.create("jhon Doe", `jhonDoe${Math.random()}@gmail.com`, "111.111.111-11", "Jhon@123", true, false, "")).toThrow("Invalid CPF")
    })
    test("Não deve criar uma conta com placa do carro inválida", async() => {
        expect(() => Account.create("jhon Doe", `jhonDoe${Math.random()}`, "158.276.650-96", "Jhon@123", false, true)).toThrow("Invalid Email")
    })
})