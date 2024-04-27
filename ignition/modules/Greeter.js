const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const GREETING = "bitlayertothemoon";

module.exports = buildModule("LockModule", (m) => {
  const greeting = m.getParameter("greeting", GREETING);

  const greeter = m.contract("Greeter", [greeting]);

  return { greeter };
});
