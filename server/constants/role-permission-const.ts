export const ROLE_PERMISSION_CONST = {
  Receptionist: { level: 1, permissions: ["view_records"] },
  Nurse: { level: 2, permissions: ["create_consent", "view_records"] },
  Hygienist: { level: 2, permissions: ["create_consent", "view_records"] },
  Dentist: {
    level: 3,
    permissions: ["create_consent", "view_records", "approve_treatments"],
  },
  Admin: {
    level: 4,
    permissions: [
      "create_consent",
      "manage_users",
      "view_records",
      "approve_treatments",
      "access_reports",
    ],
  },
};
