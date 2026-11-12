const decryptedFiles = new Map<string, Promise<ArrayBuffer>>();

async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const cacheKey = `${url}\u0000${password}`;
  let decrypted = decryptedFiles.get(cacheKey);
  if (!decrypted) {
    decrypted = (async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Unable to load 3D model (${response.status})`);
      const encryptedData = await response.arrayBuffer();
      const iv = new Uint8Array(encryptedData.slice(0, 16));
      const data = encryptedData.slice(16);
      const key = await generateAESKey(password);
      return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
    })();
    decryptedFiles.set(cacheKey, decrypted);
  }

  try {
    return (await decrypted).slice(0);
  } catch (error) {
    decryptedFiles.delete(cacheKey);
    throw error;
  }
};
