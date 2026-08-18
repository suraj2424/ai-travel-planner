import { SignJWT, jwtVerify } from "jose";
import { config } from "../../config/env";

const secret = new TextEncoder().encode(config.jwt_secret);

export async function generateAccessToken(userId: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(config.jwt_access_token_expires_in)
    .sign(secret)
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secret);

  return payload
}

export function generateRefreshToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}