export const router = $app.stage === "sandbox"
  ? new sst.aws.Router("SharedRouter", {
      domain: {
        name: "sandbox.bodymentor.click",
        aliases: ["*.sandbox.bodymentor.click"]
      }
    })
  : undefined;
