import Password from "../../src/domain/valueObject/Password";

test("Deve criar umas senha válida" ,() => {
    const password = new Password("Jhon@123");
    expect(password.getValue()).toBe("Jhon@123");
});

test("Não deve criar uma senha válida" ,() => {
    expect(() => new Password("123")).toThrow(new Error("Invalid Password"));
});
