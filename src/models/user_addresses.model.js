export const userAddressesModel = {
  toPublic(userAddresses) {
    if (!userAddresses) {
      return null;
    }
    return {
      id: userAddresses.id,
      user_id: userAddresses.userId,
      country_id: userAddresses.countryId,
      street: userAddresses.street,
      city: userAddresses.city,
      postal_code: userAddresses.postalCode,
      is_primary: userAddresses.isPrimary,
      created_at: userAddresses.createdAt,
    };
  },
};