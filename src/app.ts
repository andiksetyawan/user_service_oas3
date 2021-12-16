import express, { Application } from 'express';
import httpContext from 'express-http-context';
import bodyParser from 'body-parser';
import compression from 'compression';

import { OpenApiValidator } from './util/openapi-validator';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createMockMiddleware } from 'openapi-mock-express-middleware';
import { errorHandler } from './middlewares/handle-error-code';
import { init } from './init';

/**
 * Setup the application routes with controllers
 * @param app
 */
async function setupRoutes(app: Application) {
    const { userController } = await init();

    app.use('/api/users', userController.getRouter());
}

/**
 * Main function to setup Express application here
 */
export async function createApp(): Promise<express.Application> {
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(compression());
    app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    const openApiValidator = new OpenApiValidator();
    await openApiValidator.install(app);

    // This should be last, right before routes are installed
    // so we can have access to context of all previously installed
    // middlewares inside our routes to be logged
    app.use(httpContext.middleware);

    await setupRoutes(app);

    app.use(errorHandler());
    app.use(
        '/mock-api', // root path for the mock server
        createMockMiddleware({
            spec: './docs/openapi.yaml',
            locale: 'id_ID',
            options: {
                // json-schema-faker options
                alwaysFakeOptionals: true,
                useExamplesValue: true
                // ...
            }
        })
    );
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./docs/openapi.yaml')));

    return app;
}
