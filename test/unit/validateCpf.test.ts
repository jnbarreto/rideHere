import CPF from "../../src/domain/valueObject/CPF";

test.each(["97456321558", "71428793860", "87748248800"])(
  "Deve validar cpf válido %s",
  function (value: string) {
    const cpf = new CPF(value);
    expect(cpf.getValue()).toBe(value);
  }
);

test.each(["9745632155", "11111111111", "97a56321558"])(
  "Não deve validar um cpf inválido %s",
  function (value: string) {
    expect(() => new CPF(value)).toThrow(new Error("Invalid CPF"));
  }
);
