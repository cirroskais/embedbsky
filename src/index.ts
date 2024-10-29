import { Hono } from "hono";
const app = new Hono({ strict: false });

import getPost from "./routes/getPost";
import getProfile from "./routes/getProfile";
import getVideo from "./routes/getVideo";
import { TestVideoEmbed } from "./pages/TestVideoEmbed";

app.use(async (c, next) => {
    await next();
    if (![302, 404, 400].includes(c.res.status)) console.log(new Date(), c.req.path);
});

app.route("/profile/:handle/post/:id", getPost);
app.route("/profile/:handle", getProfile);
app.route("/video/:did/:blob/video.mp4", getVideo);

app.get("/testVideoEmbed", (c) => c.html(TestVideoEmbed()));

app.all("*", (c) => c.redirect("https://github.com/cirroskais/embedsky"));

export default { fetch: app.fetch, hostname: "0.0.0.0" };
