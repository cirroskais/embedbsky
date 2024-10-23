import type { Image } from "@atproto/api/dist/client/types/app/bsky/embed/images";

export const DEVELOPMENT = process.env?.NODE_ENV === "development";

export function createImageUrl(did: string, image: Image) {
    return `https://cdn.bsky.app/img/feed_fullsize/plain/${did}/${image.image.ref}@png`;
}
