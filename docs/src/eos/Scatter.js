import config from "./config";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";

var account;

ScatterJS.plugins(new ScatterEOS());

const network = ScatterJS.Network.fromJson({
  blockchain: "eos",
  chainId: config.chainId,
  host: config.scatterHost,
  port: 443,
  protocol: "https"
});

var scatter = ScatterJS.scatter;
const eosOptions = { expireInSeconds: 60 };
var eos = scatter.eos(network, Eos, eosOptions);
const requiredFields = { accounts: [network] };

ScatterJS.connect(config.gameName, { network }).then(connected => {
  if (!connected) {
    window.alert("Scatter Not Found");
    return false;
  }
  scatter = ScatterJS.scatter;
  ScatterJS.login().then(() => {
    scatter.getIdentity(requiredFields).then(() => {
      eos = scatter.eos(network, Eos, eosOptions);
      account = scatter.identity.accounts.find(x => x.blockchain === "eos");
      // console.log(account);
    });
  });
});

function getAccount() {
  return account;
}

function eosBet(amount, number, contract, callback) {
  // console.log(number);
  const actions = [
    {
      account: "eosio.token",
      name: "transfer",
      authorization: [
        {
          actor: account.name,
          permission: "active"
        }
      ],
      // 参数
      data: {
        from: account.name,
        to: contract,
        quantity: `${amount.toFixed(4)} EOS`,
        memo: `${number}`
      }
    }
  ];
  eos
    .transaction({ actions: actions })
    .then(result => {
      //console.log(result);
      callback(result);
    })
    .catch(e => {
      console.error(e);
      // console.error(typeof e);
      const response = JSON.parse(e);
      // console.log(response);
      // console.log(response.code);
      // console.log(response.error);
      // if (response.code === 500) window.alert(response.error.what);
      //response.error.details.
      callback(response.code);
    });
}

function diceBet(amount, number, callback) {
  eosBet(amount, number, config.dice_contract, callback);
}
function etherollBet(amount, number, callback) {
  eosBet(amount, number, config.etheroll_contract, callback);
}
function coinBet(amount, number, callback) {
  eosBet(amount, number, config.coin_contract, callback);
}
function twoBet(amount, number, callback) {
  eosBet(amount, number, config.two_contract, callback);
}
function endlessBet(amount, number, callback) {
  eosBet(amount, number, config.endless_contract, callback);
}

function getBalance(callback) {
  if (typeof account === "undefined") return;
  eos
    .getCurrencyBalance("eosio.token", account.name, "EOS")
    .then(result => {
      //console.log(result);
      callback(result);
    })
    .catch(error => {
      console.error(error);
    });
}

function getHistory(start, contract, callback) {
  if (typeof account === "undefined") return;
  if (start < 0) start = 0;
  const RECORD_TABLE = "history";
  const tableparam = {
    json: true,
    code: contract,
    scope: account.name,
    table: RECORD_TABLE,
    limit: 100,
    // index_position: 1,
    // key_type: "int64",
    lower_bound: start
    // upper_bound: end,
    // limit: 10
  };
  eos
    .getTableRows(tableparam)
    .then(result => {
      // console.log(result);
      callback(result);
    })
    .catch(error => {
      console.error(error);
    });
}

function getDiceHistory(start, callback) {
  getHistory(start, config.dice_contract, callback);
}
function getEtherollHistory(start, callback) {
  getHistory(start, config.etheroll_contract, callback);
}
function getCoinHistory(start, callback) {
  getHistory(start, config.coin_contract, callback);
}
function getTwoHistory(start, callback) {
  getHistory(start, config.two_contract, callback);
}

function getHistoryIndex(contract, callback) {
  const RECORD_TABLE = "result";
  const tableparam = {
    json: true,
    code: contract,
    scope: account.name,
    table: RECORD_TABLE,
    limit: 1
    // index_position: 1,
    // key_type: "name",
    // lower_bound: account.name,
    // upper_bound: userName,
    // limit: 10
  };
  eos
    .getTableRows(tableparam)
    .then(result => {
      // console.log(result);
      // console.log(result.rows[0]);
      callback(result.rows);
    })
    .catch(error => {
      console.error(error);
    });
}
function getDiceHistoryIndex(callback) {
  getHistoryIndex(config.dice_contract, callback);
}
function getEtherollHistoryIndex(callback) {
  getHistoryIndex(config.etheroll_contract, callback);
}
function getCoinHistoryIndex(callback) {
  getHistoryIndex(config.coin_contract, callback);
}
function getTwoHistoryIndex(callback) {
  getHistoryIndex(config.two_contract, callback);
}

function getGameStatus(callback) {
  const RECORD_TABLE = "peroid";
  const tableparam = {
    json: true,
    code: config.endless_contract,
    scope: config.endless_contract,
    table: RECORD_TABLE,
    limit: 1
  };
  eos
    .getTableRows(tableparam)
    .then(result => {
      callback(result.rows);
    })
    .catch(error => {
      console.error(error);
    });
}

function newGame(callback) {
  const actions = [
    {
      account: config.endless_contract,
      name: "newgame",
      authorization: [
        {
          actor: account.name,
          permission: "active"
        }
      ],
      // 参数
      data: {
      }
    }
  ];
  eos
    .transaction({ actions: actions })
    .then(result => {
      callback(result);
    })
    .catch(e => {
      console.error(e);
      const response = JSON.parse(e);
      callback(response.code);
    });
}

function rollDice(callback) {
  const actions = [
    {
      account: config.endless_contract,
      name: "rolldice",
      authorization: [
        {
          actor: account.name,
          permission: "active"
        }
      ],
      // 参数
      data: {
      }
    }
  ];
  eos
    .transaction({ actions: actions })
    .then(result => {
      callback(result);
    })
    .catch(e => {
      console.error(e);
      const response = JSON.parse(e);
      callback(response.code);
    });
}

function getBetList(callback) {
  const RECORD_TABLE = "bet";
  const tableparam = {
    json: true,
    code: config.endless_contract,
    scope: config.endless_contract,
    table: RECORD_TABLE,
    limit: 1000
  };
  eos
    .getTableRows(tableparam)
    .then(result => {
      callback(result.rows);
    })
    .catch(error => {
      console.error(error);
    });
}

function getGameResult(callback) {
  const RECORD_TABLE = "result";
  const tableparam = {
    json: true,
    code: config.endless_contract,
    scope: config.endless_contract,
    table: RECORD_TABLE,
    limit: 1
  };
  eos
    .getTableRows(tableparam)
    .then(result => {
      callback(result.rows);
    })
    .catch(error => {
      console.error(error);
    });
}

export default {
  getAccount,

  diceBet,
  etherollBet,
  coinBet,
  twoBet,
  endlessBet,

  getDiceHistoryIndex,
  getEtherollHistoryIndex,
  getCoinHistoryIndex,
  getTwoHistoryIndex,

  getDiceHistory,
  getEtherollHistory,
  getCoinHistory,
  getTwoHistory,

  getBalance,

  getGameStatus,
  getGameResult,
  getBetList,

  newGame,
  rollDice,
};
