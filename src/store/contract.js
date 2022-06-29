import contractABI from "./../contract/contractABI.js";
import axios from "axios";
import Web3 from "web3";
const web3 = new Web3("http://localhost:8545");

// Default gas
const gasBuy = 900000;
// const viewContract = new web3.eth.Contract(
//     contractABI.viewAbi,
//     process.env.VUE_APP_VIEW_ADDRESS
// );
const matrixContract = new web3.eth.Contract(
    contractABI.matrixAbi,
    process.env.VUE_APP_MATRIX_ADDRESS
);
const reinvestContract = new web3.eth.Contract(
    contractABI.reinvestAbi,
    process.env.VUE_APP_REINVEST_ADDRESS
);

export default {
    actions: {
        /**
         * Connect
         *
         * @returns {Object}
         */
        async connect() {
            if (typeof window.ethereum !== "undefined") {
                try {
                    let data = {
                        method: "wallet_switchEthereumChain",
                        params: [{
                            chainId: "0x38",
                        }, ],
                    };
                    await window.ethereum.request(data);
                } catch (switchError) {
                    let data = {
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: "0x38",
                            chainName: "Smart Chain",
                            rpcUrls: ["https://bsc-dataseed.binance.org/"],
                        }, ],
                    };
                    if (switchError.code === 4902) {
                        await window.ethereum.request(data).catch((err) => {
                            console.log(err);
                        });
                    }
                }
            }
        },

        /**
         * initAccount
         *
         * @returns {Object}
         */
        async initAccount(ctx) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            let metaAdress = accounts[0];

            ctx.dispatch("getAccountInfo", metaAdress);
        },

        /**
         * buyTable
         *
         * @param {string} address account address
         * @param {Number} table table id
         * @param {Number} sum table price
         * @param {Number} refId account referal id
         *
         * @returns {Object}
         */
        async buyTable(ctx, table, sum, refId) {
            ctx.dispatch("initAccount");
            console.log(ctx.state)
            const address = ctx.state.account.address;

            let data = {
                from: address,
                value: sum,
                gas: gasBuy,
            };
            await matrixContract.methods
                .buyTable(table, refId)
                .send(data)
                .catch((err) => ctx.commit("setError", err));
        },

        /**
         * pullReward
         *
         * @param {string} address account address
         * @param {Number} pullId pull id
         * @param {Number} sum price
         *
         * @returns {Object}
         */
        async pullReward(ctx, address, pullId, sum) {
            let data = {
                from: address,
                value: sum,
                gas: gasBuy,
            };
            await reinvestContract.methods
                .RewardToPull(pullId)
                .send(data)
                .catch((err) => ctx.commit("setError", err));
        },

        /**
         * Reinvest
         *
         * @param {string} address account address
         * @param {Number} table table id
         *
         * @returns {Object}
         */
        async reinvest(ctx, address, table) {
            let data = {
                from: address,
                value: 0,
                gas: gasBuy,
            };
            await reinvestContract.methods
                .ReinvestTable(table, address)
                .send(data)
                .catch((err) => ctx.commit("setError", err));
        },

        /**
         * getFullUserInfo
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getFullUserInfo(ctx) {
            let results = [2, "addressRef", 10, [11, 9, 8, 7, 6]];

            let response = {
                id: results[0],
                referalAddress: results[1],
                referalCount: results[2],
                paymant: {
                    table: results[3][0],
                    referal: results[3][1],
                    pullDeposit: results[3][2],
                    pull: results[3][3],
                    pullReferal: results[3][4],
                },
            };

            ctx.commit("setAccountInfo", response);


            // await ctx.dispatch("connect");
            // let userInfo = await viewContract.methods
            //     .GetFullUserInfo(address)
            //     .call({
            //         from: address,
            //     })
            //     .then((res) => {
            //         console.log(res);
            //     })
            //     .catch((err) => console.log(err));
            // return userInfo;
        },

        /**
         * GetUserTableProgress
         *
         * @param {string} address account address
         *
         * @returns {Array}
         */
        async getUserTableProgress(ctx) {
            let response = [0, 10, 20, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 10];

            ctx.commit("setProgressInfo", response);

            // await ctx.dispatch("connect");
            // let userId = await viewContract.GetUserId(address).call({
            //   from: address,
            // });
            // let places = [];
            // for (let table = 1; table <= 16; table++) {
            //   let position = await viewContract.methods
            //     .GetTablePosition(userId)
            //     .call({
            //       from: address,
            //     });
            //   if (position[0] === 0) {
            //     places.push(0);
            //   } else {
            //     places.push(position[0] / (position[1] / 100));
            //   }
            // }
            // return places;
        },

        /**
         * getUserLevels
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getUserLevels(ctx) {
            let results = [
                [
                    false,
                    true,
                    true,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                ],
                [0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 10, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ];

            let response = {
                activedTable: results[0],
                tableInfo: {
                    paymantCount: results[1],
                    activedCount: results[2],
                    paymant: results[3],
                }
            };
            ctx.commit("setTableInfo", response);
            // await ctx.dispatch("connect");
            // let userId = await viewContract.GetUserId(address).call({
            //   from: address,
            // });
            // let levels = await viewContract.methods.GetUserLevels(userId).call({
            //   from: address,
            // });
            // return levels;
        },

        /**
         * getGlobalStat
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getGlobalStat(ctx) {
            let results = [10, 20, 30, 40, 50, 60];

            let response = {
                accountCount: results[0],
                tableCount: results[1],
                pullMoney: results[2],
                tableMoney: results[3],
                pullCount: results[4],
                pullPaymant: results[5],
            };
            ctx.commit("setGlobalInfo", response);
            // await ctx.dispatch("connect");
            // let stat = await viewContract.methods.GetGlobalStat().call({
            //   from: address,
            // });
            // return stat;
        },

        /**
         * getIdByAddress
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getIdByAddress(ctx) {
            let response = {
                id: 1
            };
            ctx.commit("setAccountId", response);
            // await ctx.dispatch("connect");
            // let userId = await viewContract.methods.GetUserId(address).call({
            //   from: address,
            // });
            // return userId;
        },


        // 
        insertAddress(ctx, data) {
            return ctx.commit("setAddress", data);
        },

        /**
         * register
         *
         * @param {Object} data password, address
         *
         * @returns {Object}
         */
        async register(ctx, data) {
            await axios
                .post(`${process.env.VUE_APP_API}account/create`, data)
                .then((res) => {
                    if (res.data.status) ctx.commit("setAccountInfo", res.data.data);
                })
                .catch((err) => {
                    err = err.response.data;
                    ctx.commit("setAccountError", err.error);
                });
        },

        /**
         * getAccountInfo
         *
         * @param {string} data address
         *
         * @returns {Object}
         */
        async getAccountInfo(ctx, data) {
            await axios
                .get(`${process.env.VUE_APP_API}account/${data}`)
                .then((res) => {
                    if (res.data.status) ctx.commit("setAccountInfo", res.data.data);
                })
                .catch((err) => {
                    if (!err.response.data.status) ctx.commit("setAddress", data);
                });
        },
        clearAccountError(ctx) {
            ctx.commit("setAccountError", {
                msg: null,
                name: null,
                env: null
            })
        }
    },
    mutations: {
        setError(state, data) {
            state.contractError = data
        },
        setResponseStatus(state, data) {
            state.contractError = data
        },
        setTableInfo(state, data) {
            state.activedTable = data.activedTable;
            state.cardData.forEach((_, idx) => {
                state.cardData[idx].isActive = data.activedTable[idx];
                state.cardData[idx].paymantCount = data.tableInfo.paymantCount[idx];
                state.cardData[idx].activedCount = data.tableInfo.activedCount[idx];
                state.cardData[idx].paymant = data.tableInfo.paymant[idx];

            });
        },
        setGlobalInfo(state, data) {
            state.globalInfo = data;
        },
        setProgressInfo(state, data) {
            state.cardData.forEach((item, idx) => {
                item.progress = data[idx];
            });
        },

        // user
        setAccountInfo(state, data) {
            let info = {
                ...state.accountInfo,
                ...data
            };

            state.accountInfo = info;
        },
        setAccountId(state, data) {
            state.accountInfo.id = data;
        },
        setAddress(state, data) {
            state.accountInfo.address = data;
        },
        setAccountError(state, data) {
            state.accountError = data;
        },
    },
    state: {
        cardData: [{
                lvl: 1,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 2,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 3,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 4,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 5,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 6,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 7,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 8,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 9,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 10,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 11,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 12,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 13,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 14,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 15,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
            {
                lvl: 16,
                price: 0.04,
                paymantCount: null,
                paymant: null,
                activedCount: null,
                bonus: null,
                progress: 0,
                isActive: false,
            },
        ],
        accountInfo: {
            id: null,
            address: null,
            password: null,
            date: null,
            referalId: null,
            referalAddress: null,
            referalCount: null,
            paymant: {
                table: null,
                referal: null,
                pullDeposit: null,
                pull: null,
                pullReferal: null,
            },
        },
        globalInfo: {
            accountCount: null,
            tableCount: null,
            pullMoney: null,
            tableMoney: null,
            pullCount: null,
            pullPaymant: null,
        },
        contractError: null,
        contractResponse: false,
        accountError: {
            msg: null,
            name: null,
            env: null,
        },
    },
    getters: {
        getContractInfo(state) {
            return state;
        },
        getAccountInfo(state) {
            return state.accountInfo;
        },
        getAccountError(state) {
            return state.accountError;
        },
    },
};