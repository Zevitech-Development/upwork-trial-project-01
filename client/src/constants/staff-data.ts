export const ROLES = ["Receptionist", "Nurse", "Dentist", "Admin", "Hygienist"]

export const PERMISSIONS = [
  { id: "create_consent", label: "Create Consent", description: "Create and manage patient consent forms" },
  { id: "manage_users", label: "Manage Users", description: "Add, edit, and remove staff members" },
  { id: "view_records", label: "View Records", description: "Access patient medical records" },
  { id: "approve_treatments", label: "Approve Treatments", description: "Approve and authorize treatments" },
  { id: "access_reports", label: "Access Reports", description: "Generate and view system reports" },
]

export const ROLE_PERMISSIONS = {
  Receptionist: { level: 1, permissions: ["view_records"] },
  Nurse: { level: 2, permissions: ["create_consent", "view_records"] },
  Hygienist: { level: 2, permissions: ["create_consent", "view_records"] },
  Dentist: { level: 3, permissions: ["create_consent", "view_records", "approve_treatments"] },
  Admin: {
    level: 4,
    permissions: ["create_consent", "manage_users", "view_records", "approve_treatments", "access_reports"],
  },
}

export type Role = keyof typeof ROLE_PERMISSIONS;

