import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { existsSync, readFileSync } from "fs";
import path from "path";
import * as mime from 'mime-types';


const getArweave = (): Arweave => {
    return Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    });
};

const getWallet = (wallet: string): JWKInterface => {
    let res: JWKInterface = JSON.parse(readFileSync(wallet, "utf-8"));
    return res;
}

async function airdrop(arweave: Arweave, wallet: JWKInterface, num: number) {
    const addr = await arweave.wallets.getAddress(wallet);
    let res = await arweave.api.get(`mint/${addr}/${num * 1e12}`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

async function airdrop2(arweave: Arweave, wallet: string, num: number) {
    const wallett = getWallet(wallet);
    const addr = await arweave.wallets.getAddress(wallett);
    let res = await arweave.api.get(`mint/${addr}/${num * 1e12}`);
    console.log(`airdrop result:${JSON.stringify(res)}`);
}

async function upload(arweave: Arweave, wallet: JWKInterface, file: string) {

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

// 获取文件的 Content-Type
function getFileContentType(filePath: string): string | null {
    // 检查文件是否存在
    if (!existsSync(filePath)) {
        console.error('错误: 文件不存在');
        return null;
    }

    // 获取文件扩展名
    const ext = path.extname(filePath).toLowerCase();

    // 使用 mime 库获取 Content-Type
    const contentType = mime.getType(ext);

    return contentType;
}

export { getArweave, getWallet, airdrop, airdrop2, upload }