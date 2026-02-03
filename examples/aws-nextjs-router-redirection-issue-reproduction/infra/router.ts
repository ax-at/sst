const stage = $app.stage;

const domain = `${stage}.${process.env.SST_DOMAIN!}`;

export const router = new sst.aws.Router("SharedRouter", {
  domain: {
    name: domain,
    aliases: [`*.${domain}`]
  },
  // Workaround:
  // - Add "x-forwarded-host" to cache key for domain-based routing
  // - Using "x-forwarded-host" instead of "host" to avoid breaking Lambda URL OAC
  // - Must preserve existing headers (like "x-open-next-cache-key") and add to them
  // UNCOMMENT BELOW LINES TO FIX THE ISSUE
  /*
  transform: {
    cachePolicy: (args) => {
      args.parametersInCacheKeyAndForwardedToOrigin = $resolve({
        params: args.parametersInCacheKeyAndForwardedToOrigin
      }).apply(({ params }) => ({
        ...params,
        headersConfig: {
          ...params.headersConfig,
          headers: {
            items: [
              ...(params.headersConfig?.headers?.items ?? []),
              "x-forwarded-host"
            ]
          }
        }
      }));
    }
  }
  */
});
