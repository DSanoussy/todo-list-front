import fs from 'fs';
import path from 'path';
import config from '../config/mockserver.config';
import {MockServerConfig, RouteConfig} from './types/interfaces';

// Function to generate MockServerConfig
export const generateMockServer = (): MockServerConfig => {
    const dataDir = path.join(__dirname, config.dataDir);
    const files = fs.readdirSync(dataDir);

    files.forEach((file) => {
        if (path.extname(file) !== '.json') {
            return;
        }

        if (!config.routeConfig[file]) {
            addDefaultRouteConfig(file);
        }
    });

    writeConfigToFile();

    return config;
};

const addDefaultRouteConfig = (file: string) => {
    config.routeConfig[file] = {
        routes: ['GET'],
        parents: [],
        customParentKeys: {},
        hasSpecificRoute: false,
    };
};

const writeConfigToFile = () => {
    const sortedRouteConfig = Object.keys(config.routeConfig)
        .sort()
        .reduce((acc, key) => {
            acc[key] = config.routeConfig[key];
            return acc;
        }, {} as typeof config.routeConfig);

    const configString = generateConfigString(sortedRouteConfig);
    const configFilePath = path.join(__dirname, '../config/mockserver.config.ts');

    fs.writeFileSync(configFilePath, configString, 'utf-8');
};

const generateConfigString = (sortedRouteConfig: { [key: string]: RouteConfig }): string => {
    return `import {MockServerConfig} from "./types/interfaces";

const config: MockServerConfig = {
    dataDir: '${config.dataDir}',
    routeConfig: {
        ${Object.entries(sortedRouteConfig).map(([key, value]) => `
        '${key}': {
            routes: [${value.routes.map(route => `'${route}'`).join(', ')}],
            parents: [${value.parents.map(parent => `'${parent}'`).join(', ')}],
            customParentKeys: {${Object.entries(value.customParentKeys).map(([parent, key]) => `'${parent}': '${key}'`).join(', ')}},
            hasSpecificRoute: ${value.hasSpecificRoute}
        }`).join(',')}
    }
};

export default config;`;
};
