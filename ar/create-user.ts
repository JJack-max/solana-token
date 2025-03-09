import Arweave from "arweave";
import { log } from "../common/my-log";
import { getArweave } from "../common/arweave";

(async () => {
    const arweave: Arweave = getArweave();

    const args = process.argv.slice(2);

    const name: string = args[0];
    const num: string = args[1];

    if (!name) {
        throw new Error("name是必传参数，样例：npx esrun ar/create-user.ts ${name} ${num}");
    }

    if (num) {
        createUser(arweave, name, Number(num));
    } else {
        createUser(arweave, name)
    }

})();

async function createUser(arweave: Arweave, name: string, num?: number) {
    const wallet = await arweave.wallets.generate();
    const address = await arweave.wallets.getAddress(wallet);
    log(`ar-${name}-${address}`, JSON.stringify(wallet));
}
