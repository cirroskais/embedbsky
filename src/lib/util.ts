import type { BlobRef } from "@atproto/api";
import type { Image } from "@atproto/api/dist/client/types/app/bsky/embed/images";

export const DEVELOPMENT = process.env?.NODE_ENV === "development";
export const BASE_URL = process.env?.BASE_URL || "http://localhost:3000";

export function createImageUrl(did: string, image: Image) {
    return `https://cdn.bsky.app/img/feed_fullsize/plain/${did}/${image.image.ref}@png`;
}

export function createVideoUrl(did: string, video: BlobRef | { ref: string }) {
    return `https://video.bsky.app/watch/${did}/${video.ref}/playlist.m3u8`;
}

export function createVideoThumbnailUrl(did: string, video: BlobRef) {
    return `https://video.bsky.app/watch/${did}/${video.ref}/thumbnail.jpg`;
}
