import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_ABsfVe3z5QlT@ep-flat-bread-a8ym9diz.eastus2.azure.neon.tech/carmarketplace?sslmode=req",
  },
});
