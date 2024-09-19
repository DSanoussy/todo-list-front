// import { createServer } from './config/fastify.config';
// import { registerGetRoutes } from './api/get.controller';
// import {registerDynamicRoutes} from "./routes/dynamicRoutes";
// import { registerPostRoutes } from './api/post.controller';
// import { registerPutRoutes } from './api/put.controller';
// import { registerDeleteRoutes } from './api/delete.controller';
// import { registerPatchRoutes } from './api/patch.controller';
// import configureRoutesPlugin from "./plugins/configureRoutesPlugin";
// // @ts-ignore
// const verifyIds = process.argv.includes('--verifyIds');
// const start = async () => {
//     const fastify = createServer();
//
//     // Registering the routes
//     registerGetRoutes(fastify);
//     registerPostRoutes(fastify);
//     registerPutRoutes(fastify);
//     registerDeleteRoutes(fastify);
//     registerPatchRoutes(fastify);
//
//     await fastify.register(configureRoutesPlugin);
//
//     // Pass the --verifyIds option to registerDynamicRoutes
//     registerDynamicRoutes(fastify, { verifyIds });
//
// fastify.listen({port: 3000, host: 'localhost'}, (err, address) => {
//     if (err) {
//         fastify.log.error(err);
//         process.exit(1);
//     }
//     console.log(`\x1b[32m[INFO]\x1b[0m Server started on ${address}`);
// });
// };
//
// start()
//     .then(() => console.log('Server started successfully'));
//
// import { createServer } from './config/fastify.config';
// import { registerGetRoutes } from './api/get.controller';
// import { registerDynamicRoutes } from "./routes/dynamicRoutes";
// import { registerPostRoutes } from './api/post.controller';
// import { registerPutRoutes } from './api/put.controller';
// import { registerDeleteRoutes } from './api/delete.controller';
// import { registerPatchRoutes } from './api/patch.controller';
// import configureRoutesPlugin from "./plugins/configureRoutesPlugin";
// import { MockServerConfig } from './config/types/interfaces';
//
// // @ts-ignore
// const verifyIds = process.argv.includes('--verifyIds');
//
// const start = async () => {
//     const fastify = createServer();
//
//     // Register basic routes
//     registerGetRoutes(fastify);
//     registerPostRoutes(fastify);
//     registerPutRoutes(fastify);
//     registerDeleteRoutes(fastify);
//     registerPatchRoutes(fastify);
//
//     // Register the plugin and get the MockServerConfig
//     const mockConfig: MockServerConfig = await fastify.register(configureRoutesPlugin);
//
//     // Pass the --verifyIds option and the mockConfig to registerDynamicRoutes
//     registerDynamicRoutes(fastify, { verifyIds }, mockConfig);
//
//     fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
//         if (err) {
//             fastify.log.error(err);
//             process.exit(1);
//         }
//         console.log(`\x1b[32m[INFO]\x1b[0m Server started on ${address}`);
//     });
// };
//
// start()
//     .then(() => console.log('Server started successfully'))
//     .catch(err => console.log('Error starting server:', err));

import { createServer } from './config/fastify.config';
import { registerGetRoutes } from './api/get.controller';
import {registerDynamicRoutes} from "./routes/dynamicRoutes";
import { registerPostRoutes } from './api/post.controller';
import { registerPutRoutes } from './api/put.controller';
import { registerDeleteRoutes } from './api/delete.controller';
import { registerPatchRoutes } from './api/patch.controller';
import configureRoutesPlugin from "./plugins/configureRoutesPlugin";

const verifyIds = process.argv.includes('--verifyIds');

const start = async () => {
    const fastify = createServer();

    // Registering the routes
    registerGetRoutes(fastify);
    registerPostRoutes(fastify);
    registerPutRoutes(fastify);
    registerDeleteRoutes(fastify);
    registerPatchRoutes(fastify);

    // Register the plugin
    await fastify.register(configureRoutesPlugin);

    // Pass the config and options to registerDynamicRoutes
    registerDynamicRoutes(fastify, { verifyIds });

    fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(`\x1b[32m[INFO]\x1b[0m Server started on ${address}`);
    });
};

start()
    .then(() => console.log('Server started successfully'))
    .catch((err) => console.error('Error starting server:', err));
