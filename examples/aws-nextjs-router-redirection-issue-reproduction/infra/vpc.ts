export const vpc = new sst.aws.Vpc("PrimaryVpc", {
    bastion: true,
    nat: "ec2",
});
