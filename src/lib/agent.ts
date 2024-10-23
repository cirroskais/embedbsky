if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) throw new Error("Missing identifier or password");

import { AtpAgent } from "@atproto/api";

const agent = new AtpAgent({ service: "https://bsky.social" });
await agent.login({ identifier: process.env.BSKY_IDENTIFIER, password: process.env.BSKY_PASSWORD });

export default agent;
