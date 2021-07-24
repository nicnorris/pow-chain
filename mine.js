const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO')
const db = require('./db');
const {PUBLIC_KEY} = require('./config');
// makes mining easier or harder ex 0x00 is harder avg 256
const TARGET_DIFFICULTY = BigInt("0x0" + "F".repeat(63));
const BLOCK_REWARD = 10;


let mining = true;
mine();

function startMining() {
    mining = true;
    mine();
}

function stopMining() {
    mining = false;
}

function mine() {
    if(!mining) return;

    const block = new Block();

    //TODO: add transactions from mempool

    const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD,);
    const coinbaseTX = new Transaction([], [coinbaseUTXO]);
    block.addTransaction(coinbaseTX);

    while(BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
        block.nonce++;
    }

    block.execute();

    db.blockchain.addBlock(block);

    console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`)

    setTimeout(mine, 2500);
}

module.exports = {
    startMining,
    stopMining,
};