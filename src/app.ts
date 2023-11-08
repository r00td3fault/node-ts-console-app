import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from './presentation/server-app';

async function main() {
    const { b: base, l: limit, s: showTable, d: fileDestination, n: fileName } = yarg;

    ServerApp.run({ base, limit, showTable, fileDestination, fileName });
}

(async () => {
    await main();
})();