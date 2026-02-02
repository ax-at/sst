export const vpc = new sst.aws.Vpc("PrimaryVpc", {
    az: ["us-east-1a", "us-east-1b"],
    bastion: true,
    nat: "ec2",
});
