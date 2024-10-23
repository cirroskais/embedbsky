import type { PropsWithChildren } from "hono/jsx";

const Style = `html, body { background-color: black; color: white; }`;

export function Layout(props: PropsWithChildren) {
    return (
        <>
            <html lang="en">
                <head>
                    <meta content="#1083fe" name="theme-color" />
                    <meta property="og:site_name" content="embedsky 🟦 ☁️" />
                    {props.children}
                    <style>{Style}</style>
                </head>
                <body>This page is for DiscordBot. If you see this, open an issue on GitHub.</body>
            </html>
        </>
    );
}
