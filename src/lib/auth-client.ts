import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://betterauth-backend.up.railway.app/api/auth",
});
