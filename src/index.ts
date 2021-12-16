import { createApp } from "./app";
import { logger } from "./util/logger";

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
    logger.error(err, "error caught in index.ts");
  }
})();
