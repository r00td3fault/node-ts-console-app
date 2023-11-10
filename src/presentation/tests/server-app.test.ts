import { CreateTable } from '../../domain/use-cases/create-table.use-case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import { ServerApp } from '../server-app';


describe('Server App', () => {

    const options = {
        base: 7,
        limit: 15,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-fileName.txt'
    };

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options - Integration test', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


        ServerApp.run(options);


        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running');
        expect(logSpy).toHaveBeenLastCalledWith('The file was saved!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
    });


    test('should run with mocked values', () => {

        const logMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;


        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledTimes(2);
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

    });
});