export interface RouteConfig {
    routes: string[];
    parents: string[];
    customParentKeys: { [key: string]: string };
    hasSpecificRoute: boolean;
}

export interface MockServerConfig {
    basePath: string;
    dataDir: string;
    routeConfig: {
        [key: string]: RouteConfig;
    };
}

export interface DynamicRouteOptions {
    verifyIds: boolean;
}