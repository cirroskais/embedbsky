import { Hono } from "hono";
import { createVideoUrl } from "../lib/util";

const app = new Hono().get("/", async (c) => {
    const did = c.req.param("did");
    const blob = c.req.param("blob");

    // This should never happen.
    if (!did || !blob) return c.notFound();

    const video = createVideoUrl(did, { ref: blob });

    const process = Bun.spawn({ cmd: ["ffmpeg", "-i", video, "-f", "webm", "-"], stdout: "pipe", stderr: "ignore" });

    return new Response(process.stdout, {
        headers: {
            "Content-Type": "video/webm",
            "Cache-Control": "max-age=604800",
        },
    });
});

export default app;
