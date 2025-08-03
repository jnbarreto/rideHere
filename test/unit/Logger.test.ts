import Logger from "../../src/infra/logger/Logger"

describe("Logger", () => {
    const data = { status: 'ok' }

    beforeEach(() => {
        Logger.getInstance().setLevel('tracer')
    })
    test("Deve consologar em nivel tracer", () => {
        Logger.getInstance().tracer("mensagem", data)
    });

    test("Deve consologar em nivel debug", () => {
        Logger.getInstance().debug("mensagem", data)
    });

    test("Deve consologar em nivel info", () => {
        Logger.getInstance().info("mensagem", data)
    });

    test("Deve consologar em nivel warn", () => {
        Logger.getInstance().warn("mensagem", data)
    });

    test("Deve consologar em nivel error", () => {
        Logger.getInstance().error("mensagem", data)
    });

    test("Deve consologar em nivel fatal", () => {
        Logger.getInstance().fatal("mensagem", data)
    });
})
