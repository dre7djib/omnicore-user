import { getPrisma } from '../config/database.js';

export const userPreferencesRepository = {
  create(data) {
    const prisma = getPrisma();
    return prisma.userPreference.create({ data });
  },

  findMany() {
    const prisma = getPrisma();
    return prisma.userPreference.findMany({ orderBy: { id: 'asc' } });
  },

  findById(id) {
    const prisma = getPrisma();
    return prisma.userPreference.findUnique({ where: { id } });
  },

  updateById(id, data) {
    const prisma = getPrisma();
    return prisma.userPreference.update({ where: { id }, data });
  },

  deleteById(id) {
    const prisma = getPrisma();
    return prisma.userPreference.delete({ where: { id } });
  },
};

