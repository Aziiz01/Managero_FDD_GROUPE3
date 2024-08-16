import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.spec.ts",  // Update this line to recognize .spec.ts files
  },

 
});
