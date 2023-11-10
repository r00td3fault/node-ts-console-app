import { ServerApp } from '../presentation/server-app';

describe('Test App.ts', () => {
    test('should call Server.run with values', async () => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '7', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir'];

        await import('../app');

        expect(serverRunMock).toHaveBeenCalledWith(
            {
                base: 7,
                limit: 20,
                showTable: true,
                fileDestination: 'custom-dir',
                fileName: 'custom-name',
            }
        );

    });
});