interface CustomImportMeta extends ImportMeta {
  env: {
    VITE_BACKEND_URL: string;
    VITE_API_RETRY: string;
  } & ImportMetaEnv;
}

const constants: {
  API_URL: string | undefined;
  API_RETRY: number;
} = {
  API_URL: (import.meta as CustomImportMeta).env.VITE_BACKEND_URL,
  API_RETRY: Number((import.meta as CustomImportMeta).env.VITE_API_RETRY) || 0
};

export default constants;
