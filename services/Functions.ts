export function isAdmin(uid: string): boolean {
  return process.env.NEXT_PUBLIC_ADMIN_UID === uid
}
