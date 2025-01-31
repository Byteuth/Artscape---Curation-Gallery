import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		plugins: {
			next: nextPlugin,
		},
		rules: {
			// Add any specific rules here if necessary
		},
		...compat.extends("next/core-web-vitals"),
	},
];
