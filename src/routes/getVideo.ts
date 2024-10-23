import { Hono } from "hono";
import { createVideoUrl } from "../lib/util";

const responseOpts = {
    headers: {
        "Content-Type": "video/webm",
        "Cache-Control": "max-age=604800",
    },
};

const app = new Hono().get("/", async (c) => {
    const did = c.req.param("did");
    const blob = c.req.param("blob");

    // This should never happen.
    if (!did || !blob) return c.notFound();

    const file: ArrayBuffer | null = await Bun.file(`/tmp/${blob}.mp4`)
        .arrayBuffer()
        .catch((_) => null);
    if (!file) {
        const video = createVideoUrl(did, { ref: blob });
        Bun.spawnSync(["ffmpeg", "-i", video, `/tmp/${blob}.mp4`]);
        const file = Bun.file(`/tmp/${blob}.mp4`);
        setTimeout(() => Bun.$`rm /tmp/${blob}.mp4`, 604800 * 1000);
        return new Response(file.stream(), responseOpts);
    } else return new Response(file, responseOpts);
});

export default app;
