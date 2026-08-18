import prisma from "../../infrastructure/database/prisma";

class AuthRepository {
  async createSession(
    userId: string,
    refreshTokenHash: string,
    expiresAt: Date
  ) {
    return prisma.session.create({
      data: {
        userId,
        refreshTokenHash,
        expiresAt
      }
    });
  }

  async findSessionBySessionID(
    sessionId: string
  ) {
    return prisma.session.findUnique({
      where: {
        id: sessionId
      }
    })
  }

  async deleteSession(id: string) {
    return prisma.session.delete({
      where: {
        id
      }
    })
  }
}

export default AuthRepository;