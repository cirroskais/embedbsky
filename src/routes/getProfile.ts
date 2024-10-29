import { Hono } from "hono";
import { Profile } from "../pages/Profile";
import { ErrorPage } from "../pages/Error";
import agent from "../lib/agent";
import { DEVELOPMENT } from "../lib/util";
import { ensureValidHandle } from "@atproto/syntax";

const app = new Hono().get("/", async (c) => {
    if (c.req.header("User-Agent") !== "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)" && !DEVELOPMENT)
        return c.redirect(`https://bsky.app${c.req.path}`);

    const handle = c.req.param("handle");

    // This should never happen.
    if (!handle) return c.html(ErrorPage());

    try {
        ensureValidHandle(handle);
    } catch (_) {
        return c.html(ErrorPage("Invalid user. Maybe try again?"));
    }

    try {
        const profile = await agent.getProfile({ actor: handle });

        return c.html(Profile(profile.data));
    } catch (e) {
        console.log(e);
        return c.html(ErrorPage());
    }
});

export default app;
