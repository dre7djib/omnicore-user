import { getPrisma } from '../config/database.js';

export const userRolesRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.userRole.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.userRole.findMany({ orderBy: { assignedAt: 'desc' } });
  },

  findByUserId(userId) {
    const prisma = getPrisma();
    return prisma.userRole.findFirst({ where: { userId } });
  },

  async updateByUserId(userId, data) {
    const prisma = getPrisma();
    const existing = await prisma.userRole.findFirst({ where: { userId } });
    if (!existing) {
      return null;
    }
    return prisma.userRole.update({
      where: { userId_roleId: { userId: existing.userId, roleId: existing.roleId } },
      data,
    });
  },

  async deleteByUserId(userId) {
    const prisma = getPrisma();
    const existing = await prisma.userRole.findFirst({ where: { userId } });
    if (!existing) {
      return null;
    }
    return prisma.userRole.delete({
      where: { userId_roleId: { userId: existing.userId, roleId: existing.roleId } },
    });
  },
};

