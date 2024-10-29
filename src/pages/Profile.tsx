import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Layout } from "./Layout";

export function Profile(profile: ProfileViewDetailed) {
    return (
        <Layout>
            <meta
                property="og:title"
                content={profile.displayName ? `${profile.displayName} (@${profile.handle})` : `@${profile.handle}`}
            />
            <meta property="og:description" content={profile.description} />
            <meta name="twitter:image" content={profile.avatar} />
        </Layout>
    );
}
