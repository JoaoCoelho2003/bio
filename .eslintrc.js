export const root = true;
export const env = {
    node: true,
};
export const ext = [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/prettier',
];
export const parserOptions = {
    parser: '@babel/eslint-parser',
};
export const rules = {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
};