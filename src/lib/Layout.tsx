import type { PropsWithChildren } from "hono/jsx";

const style = `html, body { background-color: black; color: white; }`;

export function Layout(props: PropsWithChildren) {
    return (
        <html>
            <head>
                <meta content="#1083fe" name="theme-color" />
                <meta property="og:site_name" content="embedsky 🟦 ☁️" />
                <style>{style}</style>
                {props.children}
            </head>
            <body>This page is for DiscordBot. If you see this, open an issue on GitHub.</body>
        </html>
    );
}
