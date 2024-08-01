import type { Config } from "jest"
import { pathsToModuleNameMapper } from "ts-jest"

import { compilerOptions } from "./tsconfig.json"

const config: Config = {
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      preset: "ts-jest",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: "<rootDir>/" }),
      testMatch: ["**/test/**/*.test.ts"],
    },
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      preset: "ts-jest",
      moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: "<rootDir>/" }),
      },
      testMatch: ["**/__tests__/**/*.test.tsx"],
    },
  ],
}

export default config
