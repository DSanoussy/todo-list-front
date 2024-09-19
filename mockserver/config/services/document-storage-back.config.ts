import {MockServerConfig} from "../types/interfaces";

const documentStorageConfig: MockServerConfig = {
    basePath: '/svc/document-storage',
    dataDir: './mockData/document-storage',
    routeConfig: {
        'documents.json': {
            routes: ['GET'],
            parents: [],
            customParentKeys: {},
            hasSpecificRoute: false
        }
    }
};

export default documentStorageConfig;
