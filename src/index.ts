import { Hono } from "hono";
const app = new Hono({ strict: false });

import getPost from "./routes/getPost";
import getProfile from "./routes/getProfile";
import getVideo from "./routes/getVideo";
import { TestVideoEmbed } from "./lib/TestVideoEmbed";

app.route("/profile/:handle/post/:id", getPost);
app.route("/profile/:handle", getProfile);
app.route("/video/:did/:blob", getVideo);

app.get("/testVideoEmbed", (c) => c.html(TestVideoEmbed()));

app.all("*", (c) => c.redirect("https://github.com/cirroskais/embedsky"));

export default { fetch: app.fetch, hostname: "0.0.0.0" };
