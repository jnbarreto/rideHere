import Password, { PasswordFactory } from "../../src/domain/valueObject/Password";

test("Deve criar umas senha válida" ,() => {
    const password = PasswordFactory.create("textplain", "Jhon@123");
    expect(password.getValue()).toBe("Jhon@123");
});

test("Não deve criar uma senha válida" ,() => {
    expect(() => PasswordFactory.create("textplain","123")).toThrow(new Error("Invalid Password"));
});
