// import ArLocal from 'arlocal';
import Arweave from 'arweave';
import { readFileSync } from 'fs';

(async () => {
    // 创建并启动ArLocal实例
    // const arLocal = new ArLocal()
    // await arLocal.start()
    // 创建本地Arweave网关
    const arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http'
    });
    const wallet = JSON.parse(readFileSync("/root/.demo-arweave-wallet.json", "utf-8"))
    // const wallet = await arweave.wallets.generate();
    const addr = await arweave.wallets.getAddress(wallet);
    let res = await arweave.api.get(`mint/${addr}/10000000000000000`);
    console.log("====>", res);
    // 创建mine函数
    const mine = () => arweave.api.get('mine')
    try {
        // 创建交易
        let transaction = await arweave.createTransaction({
            data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
        }, wallet);
        // 签署并发布交易
        await arweave.transactions.sign(transaction, wallet);
        const response = await arweave.transactions.post(transaction);
        // 挖矿交易
        await mine()
        // 测试响应结果
    } catch (err) {
        console.error(err)
    }
    // 关闭测试环境
    // await arLocal.stop()
})();