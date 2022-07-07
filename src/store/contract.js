import axios from "axios";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

// Default gas
const gasBuy = 900000;

// Contracts
import contractABI from "./../contract/contractABI.js";
const viewContract = new web3.eth.Contract(contractABI.viewAbi, process.env.VUE_APP_VIEW_ADDRESS);
const matrixContract = new web3.eth.Contract(contractABI.matrixAbi, process.env.VUE_APP_MATRIX_ADDRESS);
const reinvestContract = new web3.eth.Contract(contractABI.reinvestAbi, process.env.VUE_APP_REINVEST_ADDRESS);
console.log(contractABI.reinvestAbi);


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
         * buyTable
         *
         * @param {string} address account address
         * @param {Number} table table id
         * @param {Number} sum table price
         * @param {Number} refId account referal id
         *
         * @returns {Object}
         */
        async buyTable(ctx, data) {
            // await ctx.dispatch("connect");

            // Get address
            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let price = String(data.price);

            let qdata = {
                from: address,
                value: web3.utils.toWei(price, "ether"),
                gas: gasBuy,
            };

            await matrixContract.methods
                .BuyTable(data.lvl, data.referalId || 0)
                .send(qdata)
                .then(() => {
                    ctx.dispatch("activeTable", {
                        lvl: data.lvl + 1,
                        status: true,
                    });
                    ctx.commit("setSuccess", true);
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
                    console.log(err);
                });
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
        async pullReward(ctx, pullId, sum) {
            // await ctx.dispatch("connect");

            // Get address
            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let data = {
                from: address,
                value: sum,
                gas: gasBuy,
            };

            await reinvestContract.methods
                .RewardToPull(pullId)
                .send(data)
                .then((res) => {
                    console.log(res);
                })
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
         * @param {Number} table table id
         *
         * @returns {Object}
         */
        async reinvest(ctx, table) {
            // await ctx.dispatch("connect");

            // Get address
            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
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
                    if (data.lvl + 1 != 16) dataLvl = ++data.lvl;
                    else dataLvl = data.lvl;

                    ctx.dispatch("activeTable", {
                        lvl: dataLvl,
                        status: true,
                    });
                    ctx.commit("setSuccess", true);
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
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getFullUserInfo(ctx) {
            // await ctx.dispatch("connect");

            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            await viewContract.methods
                .GetFullUserInfo(address)
                .call({
                    from: address,
                })
                .then((res) => {
                    let response = {
                        webId: res[0],
                        referalAddress: res[1],
                        referalCount: res[2],
                        paymant: {
                            table: web3.utils.fromWei(String(res[3][0]), "ether"),
                            referal: web3.utils.fromWei(String(res[3][1]), "ether"),
                            pullDeposit: res[3][2],
                            pull: res[3][3],
                            pullReferal: res[3][4],
                        },
                    };

                    ctx.commit("setAccountInfo", response);
                })
                .catch((err) => console.log(err));
        },

        /**
         * GetUserTableProgress
         *
         * @param {string} address account address
         *
         * @returns {Array}
         */
        async getUserTableProgress(ctx) {
            // await ctx.dispatch("connect");

            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let userId;
            await viewContract.methods
                .GetUserId(address)
                .call({
                    from: address,
                })
                .then((res) => (userId = res ? res : null));

            if (userId) {
                let places = [];
                for (let table = 1; table <= 16; table++) {
                    await viewContract.methods
                        .GetTablePosition(userId, address, table)
                        .call({
                            from: address,
                        })
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
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getUserLevels(ctx) {
            // await ctx.dispatch("connect");

            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let userId = await viewContract.methods
                .GetUserId(address)
                .call({
                    from: address,
                })
                .then(res => res)
                .catch(() => null);

            if (userId) {
                await viewContract.methods
                    .GetUserLevels(userId)
                    .call({
                        from: address,
                    })
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
         *
         * @param {string} address account address
         *
         * @returns {Object}
         */
        async getGlobalStat(ctx) {
            // await ctx.dispatch("connect");

            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];
            await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((res) => {
                    address = res[0];
                });

            await viewContract.methods
                .GetGlobalInfo()
                .call({
                    from: address,
                })
                .then((res) => {
                    let response = {
                        accountCount: res[0],
                        tableCount: res[1],
                        pullMoney: res[2],
                        tableMoney: web3.utils.fromWei(String(res[3]), "ether"),
                        pullCount: res[4],
                        pullPaymant: res[5],
                    };
                    ctx.commit("setGlobalInfo", response);
                });
        },

        async GetPullsInfo() {
            // await ctx.dispatch("connect");

            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let pullCount;
            await viewContract.methods
                .GetPullCount()
                .call({
                    from: address,
                })
                .then((res) => {
                    pullCount = res;
                })
                .catch((err) => {
                    console.log(err);
                });

            let pullInfo = [];
            for (let pull = 1; pull <= pullCount; pull++) {
                let info;
                await viewContract.methods
                    .GetPullById(pull)
                    .call({
                        from: address,
                    })
                    .then((res) => {
                        info = res;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                pullInfo.push(info);
            }
            return pullInfo;
        },

        /**
         * register
         *
         * @param {Object} data password, address
         *
         * @returns {Object}
         */
        async register(ctx, data) {
            let address = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = address[0];

            let userId = data.referalId || 0;
            console.log(data.referalId);

            if (data.referalId) {
                let referalInfo = await axios.get(`${process.env.VUE_APP_API}account/${userId}`).catch(() => console.log("ref don't found"));
                if (referalInfo) {
                    userId = await viewContract.methods.GetUserId(data.referalId).call({
                        from: address,
                    });
                } else userId = 0;
            }

            await axios
                .post(`${process.env.VUE_APP_API}account/create`, {
                    address: address,
                    password: data.password,
                    referalId: userId,
                })
                .then((res) => ctx.commit("setAccountInfo", res.data.data))
                .catch((err) => ctx.commit("setError", err.response.data.error));
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

        /**
         * checkPassCount
         *
         * @param {Object} data address refCount tableCount
         *
         * @returns {Object}
         */
        async checkPassCount(ctx, data) {
            await axios
                .post(`${process.env.VUE_APP_API}password/checkCount`, data)
                .catch((err) => ctx.commit("setError", err.response.data.error));
        },



        clearAccountInfo(ctx) {
            ctx.commit("clearAccountInfo");
        },

        clearError(ctx) {
            ctx.commit("setError", {
                msg: null,
                name: null,
                env: null,
            });
        },

        clearResponse(ctx) {
            ctx.commit("setSuccess", false);
        },

        activeTable(ctx, table) {
            ctx.commit("setActiveTable", table);
        },

        insertAddress(ctx, data) {
            return ctx.commit("setAddress", data);
        },
    },
    mutations: {
        setError(state, data) {
            state.error = data;
        },

        setSuccess(state, data) {
            state.response = data;
        },

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
            state.cardData = tables;

            let activeTableCount = data.activedTable.find(table => table);
            state.accountInfo.tableCount = activeTableCount || 0;
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
                ...data,
            };

            state.accountInfo = info;
        },

        clearAccountInfo(state) {
            state.accountInfo = {
                id: null,
                webId: null,
                address: null,
                password: null,
                date: null,
                referalAddress: null,
                referalCount: null,
                paymant: {
                    table: null,
                    referal: null,
                    pullDeposit: null,
                    pull: null,
                    pullReferal: null,
                },
            };
        },

        setAccountId(state, data) {
            state.accountInfo.id = data;
        },

        setAddress(state, data) {
            state.accountInfo.address = data;
        },

        setActiveTable(state, data) {
            state.cardData[data.lvl - 1].isActive = data.status;
        },
    },
    state: {
        cardData: [{
            lvl: 0,
            price: 0,
            paymantCount: null,
            paymant: null,
            activedCount: null,
            bonus: null,
            progress: null,
            isActive: false,
        }],
        cardPrice: [0.04, 0.07, 0.12, 0.2, 0.35, 0.6, 1.3, 2.1, 3.3, 4.7, 6, 8, 11, 14, 16, 20],
        accountInfo: {
            id: null,
            webId: null,
            address: null,
            password: null,
            date: null,
            referalAddress: null,
            referalCount: null,
            tableCount: null,
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
        error: {
            msg: null,
            name: null,
            env: null,
        },
        response: null,
    },
    getters: {
        getContractInfo(state) {
            return state;
        },
        getAccountInfo(state) {
            return state.accountInfo;
        },
        getError(state) {
            return state.error;
        },
    },
};