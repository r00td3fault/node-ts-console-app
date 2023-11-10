import { SaveFile } from '../save-file.use-case';
import fs from 'fs';


describe('SaveFileUseCase', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        //clean up
        const fileExists = fs.existsSync('outputs/table.txt');
        if (fileExists) fs.rmSync('outputs', { recursive: true });
    });

    describe('Default values', () => {


        test('Should save field with default values', () => {

            const saveFile = new SaveFile();

            const options = {
                fileContent: 'test content'
            };

            const wasCreated = saveFile.execute(options);
            const fileExists = fs.existsSync('outputs/table.txt');
            const fileContent = fs.readFileSync('outputs/table.txt', { encoding: 'utf-8' });

            expect(wasCreated).toBeTruthy();
            expect(fileExists).toBeTruthy();
            expect(fileContent).toBe('test content');
        });

    });

    describe('Custom values', () => {

        const filePath = 'custom-outputs';

        afterEach(() => {
            //clean up
            fs.rmSync(filePath, { recursive: true });
        });

        test('Should save field with custom values', () => {
            const saveFile = new SaveFile();
            const filePath = 'custom-outputs';

            const options = {
                fileContent: 'custom content',
                fileDestination: filePath,
                fileName: 'custom-table-name.txt'
            };

            const wasCreated = saveFile.execute(options);
            const fileExists = fs.existsSync(`${filePath}/${options.fileName}`);
            const fileContent = fs.readFileSync(`${filePath}/${options.fileName}`, { encoding: 'utf-8' });

            expect(wasCreated).toBeTruthy();
            expect(fileExists).toBeTruthy();
            expect(fileContent).toBe(options.fileContent);
        });
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { throw new Error(' Dir error'); });

        const wasCreated = saveFile.execute({ fileContent: 'Prueba' });

        expect(wasCreated).toBeFalsy();

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be wrote', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error('Write error'); });

        const wasCreated = saveFile.execute({ fileContent: 'Prueba' });

        expect(wasCreated).toBeFalsy();

        writeFileSpy.mockRestore();
    });
});