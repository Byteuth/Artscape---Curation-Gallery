import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		extends: [...compat.extends("next/core-web-vitals")],
		plugins: {
			next: nextPlugin,
		},
	},
];

export default eslintConfig;
