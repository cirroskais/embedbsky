import { Hono } from "hono";
const app = new Hono({ strict: false });

import getPost from "./routes/getPost";
import getProfile from "./routes/getProfile";

app.route("/profile/:handle/post/:id", getPost);
app.route("/profile/:handle", getProfile);

app.all("*", (c) => c.redirect("https://github.com/cirroskais/embedsky"));

export default { fetch: app.fetch, hostname: "0.0.0.0" };
