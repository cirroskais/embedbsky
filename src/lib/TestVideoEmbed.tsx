export function TestVideoEmbed() {
    return (
        <html>
            <head>
                <meta property="og:title" content="Title (works)" />
                <meta property="og:description" content="Description (missing)" />
                <meta property="og:type" content="video.other" />
                <meta property="og:video" content="https://snep.lol/download/UEcSIulWYZ.mp4" />
            </head>
            <body></body>
        </html>
    );
}
