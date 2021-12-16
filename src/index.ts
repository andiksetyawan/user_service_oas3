import { createApp } from "./app";
import { logger } from "./util/logger";

// function main() {
//   const app = express();
//   const port = 8080;

//   app.get("/", (req, res) => res.send("Express + Typescript + NodeJS = 😍"));

//   app.listen(port, () => {
//     console.log(`[server] server dimulai di http://localhost:${port} ⚡`);
//   });
// }

// main();

(async () => {
  try {
    const app = await createApp();
    const server = app.listen(app.get("port"), () => {
      logger.info(
        {
          port_number: app.get("port"),
          env_string: app.get("env"),
        },
        "Started express server"
      );
    });
  } catch (err) {
    logger.error(err, "error caught in server.ts");
  }
})();
