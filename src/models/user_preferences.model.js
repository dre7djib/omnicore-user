export const userPreferencesModel = {
  toPublic(userPreferences) {
    if (!userPreferences) {
      return null;
    }
    return {
      id: userPreferences.id,
      user_id: userPreferences.userId,
      language: userPreferences.language,
      timezone: userPreferences.timezone,
      notifications_enabled: userPreferences.notificationsEnabled,
    };
  },
};

