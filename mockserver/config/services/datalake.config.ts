import {MockServerConfig} from "../types/interfaces";

const datalakeConfig: MockServerConfig = {
    basePath: '/svc/datalake',
    dataDir: './mockData/datalake',
    routeConfig: {
        'rented-unit.json': {
            routes: ['GET'],
            parents: [],
            customParentKeys: {},
            hasSpecificRoute: false
        }
    }
};

export default datalakeConfig;
