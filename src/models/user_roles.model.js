export const userRolesModel = {
  toPublic(userRoles) {
    if (!userRoles) {
      return null;
    }
    return {
      user_id: userRoles.userId,
      role_id: userRoles.roleId,
      assigned_at: userRoles.assignedAt,
    };
  },
};