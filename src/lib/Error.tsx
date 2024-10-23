import { Layout } from "./Layout";

export function ErrorPage() {
    const description = "There was an error processing this embed. Sorry about that.";

    return (
        <Layout>
            <meta property="og:description" content={description} />
        </Layout>
    );
}
