module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testEnvironment: 'enzyme',
    moduleNameMapper: {
        '@components/(.*)': '<rootDir>/src/components/$1/index.tsx',
        '@layouts/(.*)': '<rootDir>/src/layouts/$1/index.tsx',
        '@services/(.*)': '<rootDir>/src/services/$1.ts',
        '@hooks/(.*)': '<rootDir>/src/services/hooks/$1',
        '@api': '<rootDir>/src/services/api/index.ts',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.s?(css|less)$': 'identity-obj-proxy',
    },
};
