/** @type {import('eslint').Linter.Config} */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',

		/* Custom */
		'prettier',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		/*
			===================================================================== Core =====================================================================
			https://eslint.org/docs/latest/rules/
		*/
		/* --------------------------------------------------------------- Recommended ---------------------------------------------------------------- */
		'no-constant-condition': 'warn',

		/* ------------------------------------------------------------------ Other ------------------------------------------------------------------- */
		// 'prefer-const': 'warn',

		/*
			================================================================== TypeScript ==================================================================
			https://typescript-eslint.io/rules/
		*/
		/* --------------------------------------------------------------- Recommended ---------------------------------------------------------------- */
		'@typescript-eslint/ban-ts-comment': 'warn',

		'@typescript-eslint/no-empty-object-type': 'warn',

		'@typescript-eslint/no-unused-vars': 'off',

		/* ------------------------------------------------------------------ Strict ------------------------------------------------------------------ */

		/* ---------------------------------------------------------------- Stylistic ----------------------------------------------------------------- */
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',

		/* ------------------------------------------------------------------ Other ------------------------------------------------------------------- */
		'@typescript-eslint/explicit-function-return-type': 'error',
	},

	ignorePatterns: [
		//
		'dist/',
		'lib/',
		'node_modules/',

		'*.d.ts',
	],
};
