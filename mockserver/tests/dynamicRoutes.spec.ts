import Fastify from 'fastify';
import {registerDynamicRoutes} from '../routes/dynamicRoutes';

describe('Route Path Generation Tests', () => {
    let fastify : ReturnType<typeof Fastify>;

    beforeEach(async () => {
        fastify = Fastify();
    });

    afterEach(() => {
        fastify.close();
    });

    it('should build default route', async () => {
        const mockConfig = {
            dataDir: './mockData',
            routeConfig: {}
        };
        jest.mock('../tests/config/mockserver-test.config', () => mockConfig);
        registerDynamicRoutes(fastify, { verifyIds: false });
        await fastify.ready();

        const printedRoutes = fastify.printRoutes();

        const expectedRoutes = ['/todos'];
        expectedRoutes.forEach(route => {
            expect(printedRoutes).toContain(route);
        });
    });

    it('should build route with specific path', async () => {
        const mockConfig = {
            dataDir: './mockData',
            routeConfig: {
                'todos.json': {
                    routes: ['GET'],
                    parents: [],
                    customParentKeys: {},
                    hasSpecificRoute: true
                }
            }
        };

        jest.mock('../tests/config/mockserver-test.config', () => mockConfig);
        registerDynamicRoutes(fastify, { verifyIds: false });
        await fastify.ready();

        const printedRoutes = fastify.printRoutes();

        const expectedRoutes = ['/todos/:id', '/todos'];
        expectedRoutes.forEach(route => {
            expect(printedRoutes).toContain(route);
        });
    });
});
