/// <reference path="./.sst/platform/config.d.ts" />

const awsProfile = process.env.AWS_PROFILE ?? "default";
const awsRegion = process.env.AWS_REGION ?? "us-east-1";

export default $config({
  app(input) {
    return {
      name: "sst-nextjs-issue",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: awsProfile,
          region: awsRegion as aws.Region,
        },
        // Required Pulumi Command Provider for the workaround to add lambda:InvokeFunction
        // permission with --invoked-via-function-url flag via AWS CLI
        command: true,
      },
    };
  },
  async run() {
    // Note: Starting in October 2025, new function URLs will require both
    //       `lambda:InvokeFunctionUrl` and `lambda:InvokeFunction` permissions.
    // See: https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html#urls-auth-none
    
    // But the Pulumi AWS provider doesn't yet support `FunctionUrlAuthType`
    // for `lambda:InvokeFunction` permission parameter for aws.lambda.Permission.
    // We use the command provider to run theAWS CLI directly with --invoked-via-function-url flag.
    // See: https://github.com/pulumi/pulumi-aws/issues/5930
    $transform(aws.lambda.FunctionUrl, (args, _opt, name) => {
      // Permission: lambda:InvokeFunction with invoked-via-function-url condition
      new command.local.Command(`${name}InvokePermission`, {
        create: $interpolate`aws lambda add-permission \
          --function-name ${args.functionName} \
          --statement-id FunctionURLInvokeAllowPublicAccess \
          --action lambda:InvokeFunction \
          --principal "*" \
          --invoked-via-function-url \
          --profile ${awsProfile} \
          --region ${awsRegion}`,
        delete: $interpolate`aws lambda remove-permission \
          --function-name ${args.functionName} \
          --statement-id FunctionURLInvokeAllowPublicAccess \
          --profile ${awsProfile} \
          --region ${awsRegion} 2>/dev/null || true`,
      });
    });

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
