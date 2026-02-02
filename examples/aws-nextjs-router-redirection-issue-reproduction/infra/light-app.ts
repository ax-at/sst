import { vpc } from "./vpc";
import { router } from "./router";

export const lightApp = new sst.aws.Nextjs("LightApp", {
  path: "apps/light-app",
  vpc,
  openNextVersion: "3.9.14",
  ...(router && {
    router: {
      instance: router,
      domain: "light.sandbox.bodymentor.click"
    }
  })
});
