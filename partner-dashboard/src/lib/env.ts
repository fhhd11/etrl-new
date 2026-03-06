type EnvKey =
  | "NEXT_PUBLIC_SUPABASE_URL"
  | "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "SESSION_SECRET";

function getEnvVar(key: EnvKey) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  get NEXT_PUBLIC_SUPABASE_URL() {
    return getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_ANON_KEY() {
    return getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return getEnvVar("SUPABASE_SERVICE_ROLE_KEY");
  },
  get SESSION_SECRET() {
    return getEnvVar("SESSION_SECRET");
  },
};
