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

type Media = {
    $type: string;
    external?: External;
    cid?: string;
    playlist?: string;
    thumbnail?: string;
    aspectRatio?: {
        height: number;
        width: number;
    };
};

type External = {
    uri: string;
    title: string;
    description: string;
    thumb: string;
};

function escape(text: string) {
    return text
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/&/g, "&amp;");
}

export function post(author: Author, post: PostView) {
    const images = post.embed?.images as Images | undefined;
    const media = post.embed?.media as Media | undefined;
    const external = (media?.external || post.embed?.external) as External | undefined;
    const playlist = (media?.playlist || post.embed?.playlist) as string | undefined;
    const aspectRatio = (media?.aspectRatio || post.embed?.aspectRatio) as { height: number; width: number } | undefined;
    const thumbnail = (media?.thumbnail || post.embed?.thumbnail) as string | undefined;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta content="#1083fe" name="theme-color" />
<meta property="og:site_name" content="embedsky 🟦 ☁️">
<link rel="alternate" href="https://embed.bsky.app/oembed?url=${post.uri}" type="application/json+oembed" title=${escape(author.displayName || author.handle)}>
<meta property="og:description" content="${escape((post.record as Record)?.text || "")}

💖 ${post.likeCount || 0} 🔁 ${(post.repostCount || 0) + (post.quoteCount || 0)} 💬 ${post.replyCount}" />

${images?.[0] || external ? `<meta name="twitter:card" content="summary_large_image" />` : ""}
${playlist ? `<meta name="twitter:card" content="player" />` : ""}
${images?.[0] ? `<meta name="twitter:image" content="${images[0].fullsize}" />` : ""}
${images?.[1] ? `<meta name="twitter:image" content="${images[1].fullsize}" />` : ""}
${images?.[2] ? `<meta name="twitter:image" content="${images[2].fullsize}" />` : ""}
${images?.[3] ? `<meta name="twitter:image" content="${images[3].fullsize}" />` : ""}
${external ? `<meta name="twitter:image" content="${external.uri}" />` : ""}
${playlist ? `<meta name="twitter:player:stream" content="${playlist}" />` : ""}
${playlist ? `<meta name="twitter:image" content="${thumbnail}" />` : ""}
${playlist ? `<meta name="twitter:player:width" content="${aspectRatio?.width}" />` : ""}
${playlist ? `<meta name="twitter:player:height" content="${aspectRatio?.height}" />` : ""}
${playlist ? `<meta property="og:video" content="${playlist}" />` : ""}
${playlist ? `<meta property="og:image" content="${thumbnail}" />` : ""}
${playlist ? `<meta property="og:video:width" content="${aspectRatio?.width}" />` : ""}
${playlist ? `<meta property="og:video:height" content="${aspectRatio?.height}" />` : ""}
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
<meta property="og:title" content="${escape(profile.displayName ? `${profile.displayName} (@${profile.handle})` : `@${profile.handle}`)}">
<meta property="og:description" content="${escape(profile.description || "")}">
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
