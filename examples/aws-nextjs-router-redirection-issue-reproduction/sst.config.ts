/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-nextjs-issue",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: process.env.AWS_PROFILE ?? "default",
        },
      },
    };
  },
  async run() {
    const Vpc = await import("./infra/vpc");
    const Router = await import("./infra/router");
    const DarkApp = await import("./infra/dark-app");
    const LightApp = await import("./infra/light-app");

    return {
      vpc: Vpc.vpc.id,
      router: Router.router.url,
      darkApp: DarkApp.darkApp.url,
      lightApp: LightApp.lightApp.url,
    };
  },
});
