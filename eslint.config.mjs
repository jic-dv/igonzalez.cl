import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next ya registra el plugin jsx-a11y; aqui solo se activa su set estricto
  {
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "error",
    },
  },
  { files: ["scripts/**"], rules: { "no-console": "off" } },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
