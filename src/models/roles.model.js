export const rolesModel = {
  toPublic(role) {
    if (!role) {
      return null;
    }
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  },
};

