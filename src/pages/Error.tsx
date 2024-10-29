import { Layout } from "./Layout";

export function ErrorPage(error: string = "There was an error processing this embed. Sorry about that.") {
    return (
        <Layout>
            <meta property="og:description" content={error} />
        </Layout>
    );
}
