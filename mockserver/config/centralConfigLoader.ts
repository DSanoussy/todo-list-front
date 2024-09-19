// centralConfigLoader.ts
import fastify from 'fastify';
import datalakeConfig from './services/datalake.config';
import documentStorageConfig from './services/document-storage-back.config';
import {registerDynamicRoutes} from "../routes/dynamicRoutes";

const loadConfigs = (fastifyInstance: ReturnType<typeof fastify>) => {
    const configs = [datalakeConfig, documentStorageConfig]; // Load all the service configs

    configs.forEach(config => {
        registerDynamicRoutes(fastifyInstance, config, {verifyIds: process.argv.includes('--verifyIds')}); // Register the routes with the basePath for each service
    });
};

export default loadConfigs;
