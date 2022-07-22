import Cookies from "js-cookie";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

// Default gas
const gasBuy = 900000;

// Contracts
import contractABI from "./../contract/contractABI.js";

const viewContract = new web3.eth.Contract(contractABI.viewAbi, process.env.VUE_APP_VIEW_ADDRESS);
const matrixContract = new web3.eth.Contract(contractABI.matrixAbi, process.env.VUE_APP_MATRIX_ADDRESS);
const reinvestContract = new web3.eth.Contract(contractABI.reinvestAbi, process.env.VUE_APP_REINVEST_ADDRESS);

export default {
  actions: {
    /**
     * Connect
     */
    async connect() {
      // if (typeof window.ethereum !== "undefined") {
      //   try {
      //     let data = {
      //       method: "wallet_switchEthereumChain",
      //       params: [{chainId: "0x38"}],
      //     };
      //     await window.ethereum.request(data);
      //   } catch (err) {
      //     let data = {
      //       method: "wallet_addEthereumChain",
      //       params: [
      //         {
      //           chainId: "0x38",
      //           chainName: "Smart Chain",
      //           rpcUrls: ["https://bsc-dataseed.binance.org/"],
      //         },
      //       ],
      //     };
      //     if (err.code === 4902) {
      //       await window.ethereum.request(data).catch((err) => {
      //         console.log(err);
      //       });
      //     }
      //   }
      // }
    },

    /**
     * buyTable
     *
     * @param {Number} lvl table lvl
     * @param {Number} sum table price
     * @param {Number} referralId account referral id
     */
    async buyTable(ctx, data) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let price = String(data.price);

      let qdata = {
        from: address,
        value: web3.utils.toWei(price, "ether"),
        gas: gasBuy,
      };

      await matrixContract.methods
        .BuyTable(data.lvl, data.referralId || 0)
        .send(qdata)
        .then(() => {
          let dataLvl;
          if (data.lvl + 1 !== 16) dataLvl = ++data.lvl;
          else dataLvl = data.lvl;

          ctx.dispatch("activeTable", {
            lvl: dataLvl,
            status: true,
          });
          ctx.commit("setResponse", true);
        })
        .catch((err) => {
          if (err.message.indexOf("Level already active") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "Level already active",
              env: err.stack,
            });
          } else if (err.message.indexOf("unknown account") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "Unknown account",
              env: err.stack,
            });
          } else if (err.message.indexOf("All previous levels must be active") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "All previous levels must be active",
              env: err.stack,
            });
          } else if (err.message.indexOf("User denied transaction signature") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "User denied transaction signature",
              env: err.stack,
            });
          } else {
            ctx.commit("setError", {
              name: err.name,
              msg: err.message,
              env: err.stack,
            });
          }
        });
    },

    /**
     * pullReward
     *
     * @param {string} address account address
     * @param {Number} pullId pull id
     * @param {Number} sum price
     */
    async pullReward(ctx, pullId, sum) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let data = {
        from: address,
        value: sum,
        gas: gasBuy,
      };

      await reinvestContract.methods
        .RewardToPull(pullId)
        .send(data)
        .catch((err) => {
          ctx.commit("setError", {
            name: err.name,
            msg: err.message,
            env: err.stack,
          });
        });
    },

    /**
     * Reinvest
     *
     * @param {string} address account address
     * @param {object} table table id
     */
    async reinvest(ctx, table) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let data = {
        from: address,
        value: 0,
        gas: gasBuy,
      };

      await reinvestContract.methods
        .ReinvestTable(table.lvl, address)
        .send(data)
        .then(() => {
          let dataLvl;
          if (table.lvl + 1 !== 16) dataLvl = ++table.lvl;
          else dataLvl = table.lvl;

          ctx.dispatch("activeTable", {
            lvl: dataLvl,
            status: true,
          });

          ctx.commit("setResponse", true);
        })
        .catch((err) => {
          if (err.message.indexOf("Not enoight token") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "Not enoight token",
              env: err.stack,
            });
          } else {
            ctx.commit("setError", {
              name: err.name,
              msg: err.message,
              env: err.stack,
            });
          }
        });
    },

    /**
     * getFullUserInfo
     */
    async getFullUserInfo(ctx) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let userId = await viewContract.methods
        .GetUserId(address)
        .call({from: address})
        .then((res) => res)
        .catch(() => null);

      await viewContract.methods
        .GetFullUserInfo(address)
        .call({from: address})
        .then((res) => {
          let response = {
            webId: userId,
            address,
            referralAddress: res[1],
            referralCount: res[2],
            paymant: {
              table: web3.utils.fromWei(String(res[3][0]), "ether"),
              referral: web3.utils.fromWei(String(res[3][1]), "ether"),
              pullDeposit: res[3][2],
              pull: res[3][3],
              pullReferral: res[3][4],
            },
          };

          ctx.commit("setAccountInfo", response);
        })
        .catch((err) => err);
    },

    /**
     * GetUserTableProgress
     */
    async getUserTableProgress(ctx) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let userId = await viewContract.methods
        .GetUserId(address)
        .call({from: address})
        .then((res) => res)
        .catch(() => null);

      if (userId) {
        let places = [];
        for (let table = 1; table <= 16; table++) {
          await viewContract.methods
            .GetTablePosition(userId, address, table)
            .call({from: address})
            .then((res) => {
              if (res[0] == 0) {
                places.push(0);
              } else {
                places.push(res[0] / (res[1] / 100));
              }
            });
        }

        ctx.commit("setProgressInfo", places);
      }
    },

    /**
     * getUserLevels
     */
    async getUserLevels(ctx) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let userId = await viewContract.methods
        .GetUserId(address)
        .call({from: address})
        .then((res) => res)
        .catch(() => null);

      if (userId) {
        await viewContract.methods
          .GetUserLevels(userId)
          .call({from: address})
          .then((res) => {
            let response = {
              activedTable: res[0],
              tableInfo: {
                paymantCount: res[1],
                activedCount: res[2],
                paymant: res[3],
              },
            };
            ctx.commit("setTableInfo", response);
          })
          .catch((err) => {
            ctx.commit("setError", {
              name: err.name,
              msg: err.message,
              env: err.stack,
            });
          });
      }
    },

    /**
     * getGlobalStat
     */
    async getGlobalStat(ctx) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      await viewContract.methods
        .GetGlobalInfo()
        .call({from: address})
        .then((res) => {
          let response = {
            accountCount: res[0],
            tableCount: res[1] - 93,
            pullMoney: res[2],
            tableMoney: web3.utils.fromWei(String(res[3]), "ether"),
            pullCount: res[4],
            pullPaymant: res[5],
          };

          ctx.commit("setGlobalInfo", response);
        });
    },

    /**
     * getPullsInfo
     */
    async getPullsInfo(ctx) {
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      let pullCount = await viewContract.methods
        .GetPullCount()
        .call({from: address})
        .then((res) => res)
        .catch((err) => err);

      let pullInfo = [];
      for (let pull = 1; pull <= pullCount; pull++) {
        let info = await viewContract.methods
          .GetPullById(pull)
          .call({from: address})
          .then((res) => res)
          .catch((err) => err);

        pullInfo.push(info);
      }
      return pullInfo;
    },

    /**
     * register
     *
     * @param {String} referralAddress referralAddress
     */
    async register(ctx, referralAddress) {
      // Connect to metamask
      await ctx.dispatch("connect");

      // Set user address
      let address = await window.ethereum.request({method: "eth_requestAccounts"});
      address = address[0];

      // Set user id
      let metaUserId = 1;

      // Check referral in chain
      if (referralAddress) {
        metaUserId = await viewContract.methods
          .GetUserId(referralAddress)
          .call({from: address})
          .then((res) => res)
          .catch(() => 1);
      }

      // Register in chain
      await matrixContract.methods
        .registerWithReferrer(metaUserId)
        .send({
          from: address,
          value: 0,
          gas: 900000,
        })
        .then(() => true)
        .catch((err) => {
          if (err.message.indexOf("User denied transaction signature") !== -1) {
            ctx.commit("setError", {
              name: err.name,
              msg: "User denied transaction signature",
              env: err.stack,
            });
          } else {
            ctx.commit("setError", {
              name: err.name,
              msg: err.message,
              env: err.stack,
            });
          }
          return false;
        });
    },

    /**
     * setError
     */
    setError(ctx, data) {
      ctx.commit("setError", data);
    },

    /**
     * setResponse
     */
    setResponse(ctx, data) {
      ctx.commit("setResponse", data);
    },

    /**
     * setAgree
     */
    setAgree(ctx, date) {
      ctx.commit("setAgree", date);
    },

    /**
     * activeTable
     */
    activeTable(ctx, table) {
      ctx.commit("setActiveTable", table);
    },
  },
  mutations: {

    /**
     * setError
     */
    setError(state, data) {
      if (data) state.error = data;
      else {
        state.error = {
          msg: null,
          name: null,
          env: null,
        }
      }
    },

    /**
     * setResponse
     */
    setResponse(state, data) {
      state.response = data;
    },

    /**
     * setAccountInfo
     */
    setAccountInfo(state, data) {
      state.accountInfo = Object.assign(state.accountInfo, data);
    },

    /**
     * setTableInfo
     */
    setTableInfo(state, data) {
      state.activedTable = data.activedTable;

      let tables = [];
      state.cardPrice.forEach((item, idx) => {
        let table = {
          lvl: idx + 1,
          price: item,
          paymantCount: parseInt(data.tableInfo.paymantCount[idx + 1]),
          paymant: web3.utils.fromWei(data.tableInfo.paymant[idx + 1]),
          activedCount: parseInt(data.tableInfo.activedCount[idx + 1]),
          bonus: null,
          progress: null,
          isActive: data.activedTable[idx],
        };

        tables.push(table);
      });

      state.cards = tables;

      let tempTables = [];
      data.activedTable.forEach((item) => {
        if (item) tempTables.push(item);
      });

      state.accountInfo.tableCount = tempTables.length || 0;
    },

    /**
     * setGlobalInfo
     */
    setGlobalInfo(state, data) {
      state.globalInfo = data;
    },

    /**
     * setProgressInfo
     */
    setProgressInfo(state, data) {
      state.cards.forEach((item, idx) => {
        item.progress = data[idx];
      });
    },

    /**
     * setActiveTable
     */
    setActiveTable(state, data) {
      state.cards[data.lvl - 1].isActive = data.isActive;

      let activedTable = [...state.activedTable];
      activedTable[data.lvl - 1] = data.isActive;
      state.activedTable = activedTable;
    },

    /**
     * setAgree
     */
    setAgree(state, data) {
      if (data) {
        state.accountInfo.isAgree = data;
        Cookies.set("isAgree", data);
      } else {
        state.accountInfo.isAgree = false;
        Cookies.remove("isAgree");
      }
    },
  },
  state: {
    cards: [
      {
        lvl: 0,
        price: 0,
        paymantCount: null,
        paymant: null,
        activedCount: null,
        bonus: null,
        progress: null,
        isActive: false,
      },
    ],
    cardPrice: [0.04, 0.07, 0.12, 0.2, 0.35, 0.6, 1.3, 2.1, 3.3, 4.7, 6, 8, 11, 14, 16, 20],
    accountInfo: {
      webId: null,
      address: null,
      referralAddress: null,
      referralCount: null,
      paymant: {
        table: null,
        referral: null,
        pull: null,
        pullDeposit: null,
        pullReferral: null,
      },
      isAgree: false,
    },
    globalInfo: {
      accountCount: null,
      tableCount: null,
      pullMoney: null,
      tableMoney: null,
      pullCount: null,
      pullPaymant: null,
    },
    activedTable: [],
    error: {
      msg: null,
      name: null,
      env: null,
    },
    response: null,
  },
  getters: {
    getAllInfo(state) {
      return state;
    },
    getAccountInfo(state) {
      return state.accountInfo;
    },
    getGlobalInfo(state) {
      return state.globalInfo;
    },
    getError(state) {
      return state.error;
    },
    getResponse(state) {
      return state.response;
    },
  },
};
