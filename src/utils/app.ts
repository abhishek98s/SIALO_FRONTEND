const isProd = true;

const env = {
  prod: "https://sialo-backend-2.vercel.app/api",
  local: "http://localhost:5000/api",
};

export const APP_BASE_URL = isProd ? env.prod : env.local;
