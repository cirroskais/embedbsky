import { Layout } from "./Layout";

import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import type { Record } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import type { Image } from "@atproto/api/dist/client/types/app/bsky/embed/images";
import { createImageUrl } from "./util";
import type { External } from "@atproto/api/dist/client/types/app/bsky/embed/external";

export function Post(author: ProfileViewDetailed, post: PostView) {
    const record = post.record as Record;

    let alternate = `https://embed.bsky.app/oembed?url=${post.uri}`;
    let description = `💖 ${post.likeCount || 0} 🔁 ${(post.repostCount || 0) + (post.quoteCount || 0)} 💬 ${post.replyCount}`;
    if (record.text) description += `\n\n${record.text}`;

    let isImagePost = !!record.embed?.images;
    let isTenorPost = !!record.embed?.external;
    let isVideoPost = !!record.embed?.video;
    let isQuotePost = !!record.embed?.record;

    let external = record.embed?.external as External;

    let images = record.embed?.images as Image[];
    let imageTags = [];

    if (images) {
        for (let image of images) {
            let content = createImageUrl(author.did, image);
            imageTags.push(<meta name="twitter:image" content={content} />);
        }
    }

    return (
        <Layout>
            <link rel="alternate" href={alternate} type="application/json+oembed" title={author.displayName || author.handle} />
            <meta property="og:description" content={description} />
            {(isImagePost || isTenorPost) && <meta name="twitter:card" content="summary_large_image" />}
            {isImagePost && imageTags}
            {isTenorPost && <meta name="twitter:image" content={external.uri} />}
        </Layout>
    );
}
