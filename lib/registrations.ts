export const authorizedRegistration = ["701020", "72773", "80038"];

export function validateRegistration(registration: string) {
  return authorizedRegistration.includes(registration);
}
