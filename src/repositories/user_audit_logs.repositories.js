import { getPrisma } from '../config/database.js';

export const userAuditLogsRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.userAuditLog.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.userAuditLog.findMany({ orderBy: { createdAt: 'desc' } });
  },

  findById(id) {
    const prisma = getPrisma();
    return prisma.userAuditLog.findUnique({ where: { id } });
  },

  updateById(id, data) {
    const prisma = getPrisma();
    return prisma.userAuditLog.update({ where: { id }, data });
  },

  deleteById(id) {
    const prisma = getPrisma();
    return prisma.userAuditLog.delete({ where: { id } });
  },
};

