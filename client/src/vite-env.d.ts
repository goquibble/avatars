// biome-ignore-all lint/correctness/noUnusedVariables: env declaration file
interface ImportMetaEnv {
  readonly VITE_AVATARS_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
