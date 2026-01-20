export const userRolesModel = {
  toPublic(userRoles) {
    if (!userRoles) {
      return null;
    }
    return {
        user_id: userRoles.user_id,
        role_id: userRoles.role_id,
        assigned_at: userRoles.assigned_at,
    };
  },
};