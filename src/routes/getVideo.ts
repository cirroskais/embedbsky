import { Hono } from "hono";
import { createVideoUrl } from "../lib/util";
import { ensureValidDid, ensureValidRecordKey } from "@atproto/syntax";

const responseOpts = {
    headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "max-age=604800",
    },
};

const app = new Hono().get("/", async (c) => {
    const did = c.req.param("did");
    const blob = c.req.param("blob");

    if (!did || !blob)
        // This should never happen.
        return c.notFound();

    try {
        ensureValidDid(did);
        ensureValidRecordKey(blob);
    } catch (_) {
        c.status(400);
        return c.text("Bad Request");
    }

    const file: ArrayBuffer | null = await Bun.file(`/tmp/${blob}.mp4`)
        .arrayBuffer()
        .catch((_) => null);

    if (!file) {
        const video = createVideoUrl(did, { ref: blob });
        Bun.spawnSync(["ffmpeg", "-i", video, `/tmp/${blob}.mp4`]);

        const file = Bun.file(`/tmp/${blob}.mp4`);
        if (!(await file.exists())) return c.notFound();

        setTimeout(() => Bun.$`rm /tmp/${blob}.mp4`, 604800 * 1000);
        return new Response(file.stream(), responseOpts);
    } else return new Response(file, responseOpts);
});

export default app;
