import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';

const { b: base, l: limit, s: displayTable } = yarg;

const header = `
===========================================
            tabla del ${base}
===========================================\n
`;

let contenido = header;

for (let index = 1; index <= limit; index++) {
    const salto = index !== 10 ? "\n" : '';
    const salida = ` ${base} x ${index} = ${base * index}` + salto;
    contenido += salida;
}

const outputPath = 'outputs';

fs.mkdirSync(outputPath, { recursive: true });

if (displayTable) console.log(contenido);

fs.writeFileSync(`outputs/tabla-${base}.txt`, contenido);
console.log("The file was saved!");