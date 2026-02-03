import { vpc } from "./vpc";
import { router } from "./router";

const stage = $app.stage;
const domain = `${stage}.${process.env.SST_DOMAIN!}`;

export const darkApp = new sst.aws.Nextjs("DarkApp", {
  path: "apps/dark-app",
  vpc,
  openNextVersion: "3.9.14",
  router: {
    instance: router,
    domain: `dark.${domain}`
  }
});
