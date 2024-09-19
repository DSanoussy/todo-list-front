import {MockServerConfig} from "./types/interfaces";

const config: MockServerConfig = {
    basePath: '/mockserver',
    dataDir: '../data', // Directory where JSON files are stored
    routeConfig: {

        'items.json': {
            routes: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            parents: ['todos'],
            customParentKeys: {'todos': 'todo_list_id'},
            hasSpecificRoute: true
        },
        'rented-unit.json': {
            routes: ['GET'],
            parents: ['svc', 'datalake', 'organizations', 'assets', 'linked-assets'],
            customParentKeys: {
                'svc': 'static',
                'datalake': 'static',
                'organizations': 'organizationCode',
                'assets': 'assetIdentifier',
                'linked-assets': 'static'
            },
            hasSpecificRoute: false
        },
        'todos.json': {
            routes: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            parents: [],
            customParentKeys: {},
            hasSpecificRoute: true
        }
    }
};

export default config;