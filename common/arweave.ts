import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { readFileSync } from "fs";

const getArweave = (): Arweave => {
    return Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    });
};

const getWallet = (wallet: string): JWKInterface{
    return JSON.parse(readFileSync(wallet, "utf-8"))
}

async function airdrop(arweave: Arweave, wallet: JWKInterface, num: number) {
    const addr = await arweave.wallets.getAddress(wallet);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

async function airdrop2(arweave: Arweave, wallet: string, num: number) {
    const wallett = getWallet(wallet);
    const addr = await arweave.wallets.getAddress(wallett);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

async function uploda(arweave: Arweave, wallet: JWKInterface, file: string) {

    const host = arweave.getConfig().api.host;
    const port = arweave.getConfig().api.port;
    const protocol = arweave.getConfig().api.protocol;

    // 1. Upload image to Arweave
    const data = readFileSync(file);

    const transaction = await arweave.createTransaction({
        data: data,
    });

    transaction.addTag("Content-Type", "image/png");

    await arweave.transactions.sign(transaction, wallet);

    const response = await arweave.transactions.post(transaction);
    console.log(response);

    const id = transaction.id;
    const imageUrl = id ? `${protocol}://${host}:${port}/${id}` : null;
    console.log("imageUrl", imageUrl);

    // 2. Upload metadata to Arweave
    const metadata = {
        name: "Custom NFT #1",
        symbol: "CNFT",
        description: "A description about my custom NFT #1",
        seller_fee_basis_points: 500,
        external_url: "https://www.customnft.com/",
        attributes: [
            {
                trait_type: "NFT type",
                value: "Custom",
            },
        ],
        collection: {
            name: "Test Collection",
            family: "Custom NFTs",
        },
        properties: {
            files: [
                {
                    uri: imageUrl,
                    type: "image/png",
                },
            ],
            category: "image",
            maxSupply: 0,
            creators: [
                {
                    address: "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
                    share: 100,
                },
            ],
        },
        image: imageUrl,
    };

    const metadataString = JSON.stringify(metadata);

    const metadataTransaction = await arweave.createTransaction({
        data: metadataString,
    });

    metadataTransaction.addTag("Content-Type", "application/json");

    await arweave.transactions.sign(metadataTransaction, wallet);

    console.log("metadata txid", metadataTransaction.id);

    const txnResult = await arweave.transactions.post(metadataTransaction);

    console.log(txnResult);
}

export { getArweave, getWallet, airdrop, airdrop2 }