import Mock from './preSet';

export const caseBase = Mock.mock('/caseBase', [
    {
        task_name: "信用卡风险评估",
        parties: [
            { party_name: "中国银行" },
            { party_name: "建设银行" },
            { party_name: "工商银行" },
            { party_name: "民生银行" },
        ],
        algo: [
            { algo_name: "神经网络(三层)" },
            { algo_name: "逻辑回归1" },
        ],
    },
    {
        task_name: "保费计算评估",
        parties: [
            { party_name: "医保局" },
            { party_name: "公立医院" },
            { party_name: "体检中心" },
            { party_name: "保险公司" },
        ],
        algo: [
            { algo_name: "神经网络(五层)" },
            { algo_name: "逻辑回归2" },
        ],
    },
])