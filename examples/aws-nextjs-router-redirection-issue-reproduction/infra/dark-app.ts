import { vpc } from "./vpc";
import { router } from "./router";

export const darkApp = new sst.aws.Nextjs("DarkApp", {
  path: "apps/dark-app",
  vpc,
  openNextVersion: "3.9.14",
  ...(router && {
    router: {
      instance: router,
      domain: "dark.sandbox.bodymentor.click"
    }
  })
});
