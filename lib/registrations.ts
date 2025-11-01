export const authorizedRegistration = ["701020", "72773", "80038", "101010"];

export function validateRegistration(registration: string) {
  return authorizedRegistration.includes(registration);
}
