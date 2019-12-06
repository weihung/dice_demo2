const gameName = 'Dice';
const config =
{
  main: {
    gameName: gameName,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', 
    httpEndpoint: 'http://bp.cryptolions.io:8888',
    scatterHost: 'nodes.get-scatter.com',
    contract: 'fannpubg1234',
  },
  jungle : {
    gameName: gameName,
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', 
    httpEndpoint: 'https://jungle2.cryptolions.io',
    scatterHost: 'jungle2.cryptolions.io',
//    contract: 'fannpubg1234',
    dice_contract: 'dicedicedemo',
    etheroll_contract: 'etherolldemo',
    coin_contract: 'coinflipdemo',
    two_contract: 'twodicedemo1',
    endless_contract: 'endlessgame1',
  }
}

module.exports = config.jungle