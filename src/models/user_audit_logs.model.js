export const userAuditLogsModel = {
  toPublic(userAuditLog) {
    if (!userAuditLog) {
      return null;
    }
    return {
      id: userAuditLog.id,
      user_id: userAuditLog.userId,
      action: userAuditLog.action,
      performed_by: userAuditLog.performedBy,
      created_at: userAuditLog.createdAt,
    };
  },
};

