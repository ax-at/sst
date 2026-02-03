const stage = $app.stage;

const domain = `${stage}.${process.env.SST_DOMAIN!}`;

export const router = new sst.aws.Router("SharedRouter", {
  domain: {
    name: domain,
    aliases: [`*.${domain}`]
  }
});
