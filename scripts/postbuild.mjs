import { copyFileSync, existsSync } from "node:fs";

const source = "build/client/404/index.html";

if (!existsSync(source)) {
	throw new Error(`Missing ${source}: the 404 page was not prerendered.`);
}

copyFileSync(source, "build/client/404.html");
