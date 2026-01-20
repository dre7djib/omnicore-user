import { getPrisma } from '../config/database.js';

export const userRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.user.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.user.findMany({ orderBy: { id: 'asc' } });
  },

  findById(id) {
    const prisma = getPrisma();
    return prisma.user.findUnique({ where: { id } });
  },

  updateById(id, data) {
    const prisma = getPrisma();
    return prisma.user.update({ where: { id }, data });
  },

  deleteById(id) {
    const prisma = getPrisma();
    return prisma.user.delete({ where: { id } });
  },
};

