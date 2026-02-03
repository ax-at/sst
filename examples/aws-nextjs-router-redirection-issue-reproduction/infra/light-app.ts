import { vpc } from "./vpc";
import { router } from "./router";

const stage = $app.stage;
const domain = `${stage}.${process.env.SST_DOMAIN!}`;

export const lightApp = new sst.aws.Nextjs("LightApp", {
  path: "apps/light-app",
  vpc,
  openNextVersion: "3.9.14",
  router: {
    instance: router,
    domain: `light.${domain}`
  }
});
