import Arweave from "arweave";
import { readFileSync } from "fs";
import { getArweave } from "../common/arweave";
import { JWKInterface } from "arweave/node/lib/wallet";

(async () => {
    let arweave = getArweave();
    // airdrop(arweave, "logs/ar-Jack-4Sj84EvOlo317Sk0YjlR7uI3IJ_R7uwcjsvHPiJSwN4.log", 1000);
    const wallet = JSON.parse(readFileSync("logs/ar-Jack-4Sj84EvOlo317Sk0YjlR7uI3IJ_R7uwcjsvHPiJSwN4.log", "utf-8"))

})();

async function airdrop(arweave: Arweave, wallet: JWKInterface, num: number) {

    // const wallet = await arweave.wallets.generate();
    const addr = await arweave.wallets.getAddress(wallet);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

export { airdrop };