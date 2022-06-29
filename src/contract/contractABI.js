export default {
    viewAbi: [{
            "inputs": [{
                    "internalType": "address",
                    "name": "userAd",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tableAd",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "pullAd",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "depAd",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }],
            "name": "GetFullUserInfo",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "GetGlobalInfo",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "pullId",
                "type": "uint256"
            }],
            "name": "GetPullById",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "GetPullCount",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "pullId",
                "type": "uint256"
            }],
            "name": "GetStructure",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint8",
                    "name": "tableNumber",
                    "type": "uint8"
                }
            ],
            "name": "GetTablePosition",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "pullId",
                "type": "uint256"
            }],
            "name": "GetTicketCount",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint256",
                    "name": "pullId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ticketNumber",
                    "type": "uint256"
                }
            ],
            "name": "GetTicketInfo",
            "outputs": [{
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }],
            "name": "GetUserId",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
            }],
            "name": "GetUserLevels",
            "outputs": [{
                    "internalType": "bool[]",
                    "name": "",
                    "type": "bool[]"
                },
                {
                    "internalType": "uint16[]",
                    "name": "",
                    "type": "uint16[]"
                },
                {
                    "internalType": "uint16[]",
                    "name": "",
                    "type": "uint16[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    matrixAbi: [{
            "inputs": [{
                    "internalType": "address",
                    "name": "UserControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "PullControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "TablesControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "PullReinvestAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [{
                    "internalType": "uint256",
                    "name": "ReferalReward",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "RefererId",
                    "type": "uint256"
                }
            ],
            "name": "AddMemberReferalRewards",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint256",
                    "name": "UserReward",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "UserId",
                    "type": "uint256"
                }
            ],
            "name": "AddMemberRewards",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint8",
                    "name": "table",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "refId",
                    "type": "uint256"
                }
            ],
            "name": "BuyTable",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "uint8",
                    "name": "table",
                    "type": "uint8"
                }
            ],
            "name": "BuyTableReInvest",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "Change",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangePullStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeReinvestAddress",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeTableStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeUserStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "_addressKey",
                "type": "address"
            }],
            "name": "Set",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "SetKey",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "refId",
                "type": "uint256"
            }],
            "name": "registerWithReferrer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withDraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
    reinvestAbi: [{
            "inputs": [{
                    "internalType": "address",
                    "name": "pullControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "userControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tableControllerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address payable",
                    "name": "gameAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "depositeControllerAddres",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeDepositeStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangePullStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeTableStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }],
            "name": "ChangeUserStorage",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "uint8",
                    "name": "table",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                }
            ],
            "name": "ReinvestTable",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "uint256",
                "name": "pullId",
                "type": "uint256"
            }],
            "name": "RewardToPull",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withDraw",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ],
}