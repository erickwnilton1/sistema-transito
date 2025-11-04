export const authorizedRegistration = [
  "701020",
  "72773",
  "80038",
  "101010",
  "202020",
];

export function validateRegistration(registration: string) {
  return authorizedRegistration.includes(registration);
}
