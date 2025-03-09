import Arweave from "arweave";
import { readFileSync } from "fs";
import { getArweave } from "../common/arweave";

(async () => {
    let arweave = getArweave();

})();

async function airdrop(arweave: Arweave, wallet: string, num: number) {

    const wallett = JSON.parse(readFileSync(wallet, "utf-8"))
    // const wallet = await arweave.wallets.generate();
    const addr = await arweave.wallets.getAddress(wallett);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}