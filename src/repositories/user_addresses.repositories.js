import { getPrisma } from '../config/database.js';

export const userAddressesRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.userAddress.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.userAddress.findMany({ orderBy: { createdAt: 'desc' } });
  },

  findById(id) {
    const prisma = getPrisma();
    return prisma.userAddress.findUnique({ where: { id } });
  },

  updateById(id, data) {
    const prisma = getPrisma();
    return prisma.userAddress.update({ where: { id }, data });
  },

  deleteById(id) {
    const prisma = getPrisma();
    return prisma.userAddress.delete({ where: { id } });
  },
};

