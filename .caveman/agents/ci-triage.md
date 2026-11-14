---
description: Reads a failed CI run on master and decides whether it is a real failure worth fixing
decides: [fix, flaky, skip]
---
Read the failed run in the data blocks, then its failing job's log (`gh run view <run id> --log-failed`). Find the first real error, not the cascade after it.

This repository is a React Router site prerendered and served by a Cloudflare Worker. CI (`.github/workflows/ci.yml`, job `check`) runs, in order: `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `pnpm smoke`, `pnpm exec wrangler deploy --dry-run`. A failing `pnpm install --frozen-lockfile` means the lockfile is behind `package.json`. `pnpm smoke` checks exact page copy and redirects, so decide whether the page or the expectation is the outdated one.

Decide fix when the failure comes from code, content or configuration in this repository and you can say where. Decide flaky when the same commit passed before, or the error is a timeout, a network call or the runner. Decide skip when the cause is outside the repository (an expired secret, a missing Cloudflare token, an outage) or the fix needs a person's call.

In three sentences at most, say what failed, why, and the file:line to change. End with `decision: fix`, `decision: flaky` or `decision: skip`.
