import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				describe: "readonly",
				it: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
				expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
			},
		},
	},
	{
		rules: {
			semi: ["error", "always"],
			"no-var": ["error"],
			"prefer-const": [
				"error",
				{ destructuring: "any", ignoreReadBeforeAssign: false },
			],
			curly: ["error"],
			eqeqeq: ["error"],
			"no-multi-spaces": ["error"],
			"no-lone-blocks": ["error"],
			"no-self-compare": ["error"],
			"no-unused-expressions": ["error"],
			"no-useless-call": ["error"],
			"no-use-before-define": ["error"],
			camelcase: ["error", { properties: "never" }],
			"func-call-spacing": ["error"],
			"no-lonely-if": ["error"],
			"array-bracket-spacing": ["error"],
			"no-console": ["off"],
		},
	},
	// {
	//   "env": {
	//     "jest": true
	//   }
	// },
	pluginJs.configs.recommended,
];
