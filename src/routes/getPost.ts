import { Hono } from "hono";
import { Post } from "../pages/Post";
import { ErrorPage } from "../pages/Error";
import agent from "../lib/agent";
import { DEVELOPMENT } from "../lib/util";
import { ensureValidHandle, ensureValidRecordKey } from "@atproto/syntax";

const app = new Hono().get("/", async (c) => {
    if (c.req.header("User-Agent") !== "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)" && !DEVELOPMENT)
        return c.redirect(`https://bsky.app${c.req.path}`);

    const handle = c.req.param("handle");
    const recordKey = c.req.param("id");

    // This should never happen.
    if (!handle || !recordKey) return c.html(ErrorPage());

    try {
        ensureValidHandle(handle);
        ensureValidRecordKey(recordKey);
    } catch (_) {
        return c.html(ErrorPage("Invalid post. Maybe try again?"));
    }

    try {
        const author = await agent.getProfile({ actor: handle });
        const posts = await agent.getPosts({ uris: [`at://${author.data.did}/app.bsky.feed.post/${recordKey}`] });

        return c.html(Post(author.data, posts.data.posts[0]));
    } catch (e) {
        console.log(e);
        return c.html(ErrorPage());
    }
});

export default app;
