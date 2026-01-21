import { getPrisma } from '../config/database.js';

export const rolesRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.role.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.role.findMany({ orderBy: { name: 'asc' } });
  },

  findById(id) {
    const prisma = getPrisma();
    return prisma.role.findUnique({ where: { id } });
  },

  updateById(id, data) {
    const prisma = getPrisma();
    return prisma.role.update({ where: { id }, data });
  },

  deleteById(id) {
    const prisma = getPrisma();
    return prisma.role.delete({ where: { id } });
  },
};

