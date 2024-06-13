const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
class Token {
  async mintToken() {
    const token = jwt.sign(
      process.env.JWT_PAYLOAD + "_" + Math.random(),
      process.env.JWT_PRIVATE_KEY
    );
    await this.saveToken(token);
    return token;
  }
  async saveToken(token) {
    await fs.writeFile("auth.txt", token);
  }
}

module.exports = { Token };
