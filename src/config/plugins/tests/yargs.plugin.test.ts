import { yarg } from '../yargs.plugin';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('../yargs.plugin');

    return yarg;
}


describe('Test args.plugin.ts', () => {
    const originalArv = process.argv;
    beforeEach(() => {
        process.argv = originalArv;
        jest.resetModules();
    });
    test('should return default values', async () => {
        const args = await runCommand(['-b', '5']);
        expect(args).toMatchObject(
            {
                b: 5,
                l: 10,
                s: false,
                d: 'outputs',
                n: '',
            }
        );
    });

    test('should return configuration with custom values', async () => {
        const args = await runCommand(['-b', '7', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);
        expect(args).toMatchObject(
            {
                b: 7,
                l: 20,
                s: true,
                d: 'custom-dir',
                n: 'custom-name',
            }
        );
    });
});