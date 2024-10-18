if (!process.env.BSKY_IDENTIFIER || !process.env.BSKY_PASSWORD) throw new Error("Missing identifier or password");

import { AtpAgent } from "@atproto/api";
import { Hono } from "hono";
import { post, profile } from "./lib/html";
const app = new Hono();

const agent = new AtpAgent({ service: "https://bsky.social" });
await agent.login({ identifier: process.env.BSKY_IDENTIFIER, password: process.env.BSKY_PASSWORD });

app.get("/profile/:handle/post/:id", async (c) => {
    if (c.req.header("User-Agent") !== "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)")
        return c.redirect(`https://bsky.app${c.req.path}`);

    const actor = c.req.param("handle");
    const postId = c.req.param("id");

    try {
        const author = await agent.getProfile({ actor: actor });
        const { data } = await agent.getPosts({ uris: [`at://${author.data.did}/app.bsky.feed.post/${postId}`] });

        return c.html(post(author.data, data.posts[0]));
    } catch (e) {
        c.redirect("https://bsky.app/");
    }
});

app.get("/profile/:handle", async (c) => {
    if (c.req.header("User-Agent") !== "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)")
        return c.redirect(`https://bsky.app${c.req.path}`);

    const handle = c.req.param("handle");

    try {
        const { data } = await agent.getProfile({ actor: handle });
        return c.html(profile(data));
    } catch (e) {
        c.redirect("https://bsky.app/");
    }
});

app.all("*", (c) => c.redirect("https://github.com/cirroskais/embedsky"));

export default app;
