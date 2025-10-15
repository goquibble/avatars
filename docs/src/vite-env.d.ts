interface ImportMetaEnv {
  readonly VITE_AVATARS_API_BASE_URL: string;
}

// biome-ignore lint/correctness/noUnusedVariables: export/import interupts vite
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
