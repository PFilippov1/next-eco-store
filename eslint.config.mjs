import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-undef': 'off',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
