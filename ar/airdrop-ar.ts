import Arweave from "arweave";
import { readFileSync } from "fs";
import { getArweave } from "../common/arweave";

(async () => {
    let arweave = getArweave();
    airdrop(arweave, "logs/ar-Jack-4Sj84EvOlo317Sk0YjlR7uI3IJ_R7uwcjsvHPiJSwN4.log", 1000);
})();

async function airdrop(arweave: Arweave, wallet: string, num: number) {

    const wallett = JSON.parse(readFileSync(wallet, "utf-8"))
    // const wallet = await arweave.wallets.generate();
    const addr = await arweave.wallets.getAddress(wallett);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

export { airdrop };