# CloudFront Cache Policy Bug Reproduction: Cross-Domain Content Mismatch in Router

This reproduction example demonstrates a critical caching bug in SST's `sst.aws.Router` when routing multiple Next.js (also any ssr-site) applications via subdomains.

## The Issue

When using the Router to serve multiple Next.js applications from different subdomains (e.g., `dark.example.com`, `light.example.com`), CloudFront incorrectly serves cached content from one subdomain to requests for another subdomain.

### What Happens

1. Visit `dark.development.example.com` → Dark themed app loads ✅
2. Visit `light.development.example.com` → Dark themed app loads again ❌ (should be light)
3. The issue persists until CloudFront cache is cleared

## Root Cause

The CloudFront cache policy for lazy routes does not include the domain/host in the cache key. This causes CloudFront to treat requests to different subdomains as cache hits for the same resource.

### Technical Details

**Current Cache Policy** (`platform/src/components/aws/router.ts`):
```typescript
headersConfig: {
  headerBehavior: "whitelist",
  headers: {
    items: ["x-open-next-cache-key"],  // ❌ Missing domain/host header
  },
},
```

**What Happens:**

1. First request to `dark.example.com/`
   - CloudFront cache MISS
   - CloudFront Function executes and routes to dark app
   - Response cached with key: `{uri="/", query="", x-open-next-cache-key="..."}`
   - Dark app content served ✅

2. Second request to `light.example.com/`
   - Cache key matches the first request (same URI, query, cache-key)
   - **Host header not included in cache key!**
   - CloudFront returns cached response without executing the CloudFront Function
   - Dark app content served instead ❌

The routing logic is correct; the problem is that CloudFront bypasses the function entirely when it finds a cache hit based on the incomplete cache key.

## Deployment & Reproduction

### Prerequisites

- AWS account with appropriate credentials
- Custom domain configured for the deployment
- Node.js and Bun installed

### Setup

1. Change directory to this example:
   ```bash
   cd examples/aws-nextjs-router-redirection-issue-reproduction
   ```

2. **Configure your domain:**
   ```bash
   cp .env.example .env
   # Edit .env and add your domain
   nano .env
   ```

   ```env
   AWS_PROFILE=default
   AWS_REGION=us-east-1
   SST_DOMAIN=yourdomain.com
   ```

3. **Install dependencies:**
   ```bash
   bun install
   ```

4. **Deploy the stack:**
   ```bash
   bun run deploy --stage development
   ```

   This will create:
   - A shared CloudFront Router
   - Dark themed Next.js app at `dark.development.yourdomain.com`
   - Light themed Next.js app at `light.development.yourdomain.com`

### Reproduce the Bug

1. Open your browser and navigate to:
   ```
   https://dark.development.yourdomain.com
   ```
   The dark themed application loads (dark background, light text)

2. Open a new tab and navigate to:
   ```
   https://light.development.yourdomain.com
   ```
   **Expected:** Light themed application (light background, dark text)
   **Actual:** Dark themed application loads (cached content)

### Verify with curl

```bash
# First request to dark app
curl -I https://dark.development.yourdomain.com/
# Note: X-Cache: Miss from cloudfront (first request)

# First request to light app
curl -I https://light.development.yourdomain.com/
# Note: X-Cache: Hit from cloudfront (should be Miss, but is Hit due to bug)
```

## The Workaround

If you need to deploy this example now, apply the following workaround in `infra/router.ts`:

```typescript
export const router = new sst.aws.Router("SharedRouter", {
  domain: {
    name: domain,
    aliases: [`*.${domain}`]
  },
  // Add this transform block to fix the caching issue
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
              "x-forwarded-host"  // Add this header to cache key
            ]
          }
        }
      }));
    }
  }
});
```

The workaround is already included in the example (commented out on lines 13-33). Simply uncomment it to enable the fix.

## The Actual Fix

The proper fix must be applied in the SST platform code at `platform/src/components/aws/router.ts` [(lines 1452-1457)](https://github.com/anomalyco/sst/blob/1b060504abebfd6425083e24a661c186e8e1ffb9/platform/src/components/aws/router.ts#L1452):

Change the cache policy from:
```typescript
headersConfig: {
  headerBehavior: "whitelist",
  headers: {
    items: ["x-open-next-cache-key"],
  },
},
```

To:
```typescript
headersConfig: {
  headerBehavior: "whitelist",
  headers: {
    items: ["x-open-next-cache-key", "x-forwarded-host"],
  },
},
```

### Why `x-forwarded-host` Instead of `host`?

Using the standard `host` header would break Lambda URL OAC (Origin Access Control) authentication:

- Lambda URLs with OAC use AWS SigV4 authentication
- The signature expects the actual Lambda URL domain as the Host header
- If CloudFront forwards the visitor's domain (e.g., `dark.development.example.com`), the signature validation fails
- `x-forwarded-host` is already set by the CloudFront Function and preserves the original domain without breaking OAC

### How the Fix Works

With `x-forwarded-host` added to the cache key:

```
Cache Key for dark.development.example.com:
  {uri="/", query="", x-open-next-cache-key="...", x-forwarded-host="dark.development.example.com"}

Cache Key for light.development.example.com:
  {uri="/", query="", x-open-next-cache-key="...", x-forwarded-host="light.development.example.com"}
```

Each subdomain now has separate cache entries, so:
1. First request to `dark.development.example.com` → Cache MISS → Dark app loads
2. First request to `light.development.example.com` → Cache MISS → Light app loads
3. Subsequent requests correctly hit their own cache entries

## Project Structure

```
examples/aws-nextjs-router-redirection-issue-reproduction/
├── infra/
│   ├── router.ts           # Shared CloudFront Router configuration
│   ├── dark-app.ts         # Dark themed Next.js app configuration
│   ├── light-app.ts        # Light themed Next.js app configuration
│   └── vpc.ts              # VPC configuration
├── apps/
│   ├── dark-app/           # Dark themed Next.js application
│   │   └── app/
│   │       └── page.tsx    # Dark app homepage
│   └── light-app/          # Light themed Next.js application
│       └── app/
│           └── page.tsx    # Light app homepage
├── packages/
│   └── base/               # Shared UI components
│       └── src/
│           ├── button.tsx
│           ├── card.tsx
│           └── dialog.tsx
├── sst.config.ts           # SST configuration
├── package.json            # Root workspace package
└── README.md               # This file
```

## Affected Versions

- SST 3.14.16+
- May exist in earlier versions as well

## Impact

This bug affects:
- All deployments using `sst.aws.Router` with domain-based routing (subdomain patterns)
- Multi-tenant applications routing by subdomain
- Any setup where multiple Next.js apps share a Router with different subdomains

## Cleanup

To remove all deployed resources:

```bash
bun run remove --stage development
```

