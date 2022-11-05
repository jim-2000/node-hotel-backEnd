import jwt from "jsonwebtoken";

const CreateJWT = (data) => {
  const secret = process.env.JWT_SECRET;
  const expire = process.env.JWT_EXPIRE;
  const token = jwt.sign(
    data,secret, { expiresIn:"10d" }
    );

  return token;
};

// jwt verify
export const VerifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

export default CreateJWT;
