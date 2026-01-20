export const userAddressesModel = {
  toPublic(userAddresses) {
    if (!userAddresses) {
      return null;
    }
    return {
      id: userAddresses.id,
      user_id: userAddresses.user_id,
      country_id: userAddresses.country_id,
      street: userAddresses.street,
      city: userAddresses.city,
      postal_code: userAddresses.postal_code,
      is_primary: userAddresses.is_primary,
      created_at: userAddresses.created_at
    };
  },
};