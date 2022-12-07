import bcrypt from "bcrypt";

function compareHash(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}
export default compareHash;
