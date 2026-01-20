export const userModel = {
  toPublic(user) {
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      country_id: user.country_id, 
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
};

