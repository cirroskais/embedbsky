import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import type { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface Author {
    displayName?: string;
    handle: string;
}

type Record = {
    text?: string;
};

type Images = {
    thumb: string;
    fullsize: string;
    alt: string;
    aspectRatio: {
        height: number;
        width: number;
    };
}[];

export function post(author: Author, post: PostView) {
    const images = post.embed?.images as Images;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta name="twitter:card" content="summary_large_image" />
<meta content="#1083fe" name="theme-color" />
<meta property="og:site_name" content="embedsky 🟦 ☁️">
<meta property="og:description" content="${(post.record as Record)?.text || ""}

💖 ${post.likeCount || 0} 🔁 ${(post.repostCount || 0) + (post.quoteCount || 0)} 💬 ${post.replyCount}" />
${images[0] ? `<meta name="twitter:image" content="${images[0].fullsize}" />` : ""}
${images[1] ? `<meta name="twitter:image" content="${images[1].fullsize}" />` : ""}
${images[2] ? `<meta name="twitter:image" content="${images[2].fullsize}" />` : ""}
${images[3] ? `<meta name="twitter:image" content="${images[3].fullsize}" />` : ""}
<link rel="alternate" href="https://embed.bsky.app/oembed?url=${post.uri}" type="application/json+oembed" title=${author.displayName || author.handle}>
<style>
html, body { background-color: black; color: white; }
</style>
</head>
<body>
This page is for DiscordBot. If you see this, open an issue on GitHub.
</body>
</html>`;
}

export function profile(profile: ProfileViewDetailed) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta content="#1083fe" name="theme-color" />
<meta property="og:site_name" content="embedsky 🟦 ☁️">
<meta property="og:title" content="${profile.displayName ? `${profile.displayName} (@${profile.handle})` : `@${profile.handle}`}">
<meta property="og:description" content="${profile.description}">
<meta name="twitter:image" content="${profile.avatar}" />
<style>
html, body { background-color: black; color: white; }
</style>
</head>
<body>
This page is for DiscordBot. If you see this, open an issue on GitHub.
</body>
</html>`;
}
