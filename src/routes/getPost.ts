import { Post } from "../lib/Post";
import { ErrorPage } from "../lib/Error";
import agent from "../lib/agent";
import { DEVELOPMENT } from "../lib/util";

import { Hono } from "hono";
const app = new Hono().get("/", async (c) => {
    if (c.req.header("User-Agent") !== "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)" && !DEVELOPMENT)
        return c.redirect(`https://bsky.app${c.req.path}`);

    const actor = c.req.param("handle");
    const postId = c.req.param("id");

    // This should never happen.
    if (!actor || !postId) return c.html(ErrorPage());

    try {
        const author = await agent.getProfile({ actor: actor });
        const posts = await agent.getPosts({ uris: [`at://${author.data.did}/app.bsky.feed.post/${postId}`] });

        return c.html(Post(author.data, posts.data.posts[0]));
    } catch (e) {
        console.log(e);
        return c.html(ErrorPage());
    }
});

export default app;
