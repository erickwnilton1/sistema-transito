export function validateRegistrationFormat(registration: string): boolean {
  if (!registration || registration.trim().length === 0) {
    return false;
  }

  return registration.trim().length >= 3;
}

export async function checkRegistrationExists(
  registration: string
): Promise<boolean> {
  try {
    const response = await fetch("/api/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration }),
    });

    const data = await response.json();
    return data.exists || false;
  } catch (error) {
    console.error("Erro ao verificar matrícula:", error);
    return false;
  }
}
