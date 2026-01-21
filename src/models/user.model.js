export const userModel = {
  toPublic(user) {
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      country_id: user.countryId,
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number: user.phoneNumber,
      status: user.status,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  },
};

