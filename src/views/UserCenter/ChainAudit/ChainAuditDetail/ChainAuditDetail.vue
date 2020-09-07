<template>
  <div class="chain-audit-detail-page">
    <div class="top">
      <span>
        订单号:
        <span class="order-id">{{detail && detail.orderId || '-'}}</span>
      </span>
      <span>
        订单时间:
        <span class="order-time">{{detail && detail.orderTime || '-'}}</span>
      </span>
    </div>
    <div class="cont">
      <div class="cont-item">
        <div class="item-label">使用方</div>
        <div class="item-desc">{{detail && detail.user || '-'}}</div>
      </div>
      <div class="cont-item">
        <div class="item-label">数据提供方</div>
        <div class="item-desc">{{detail && detail.provider || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'model'">
        <div class="item-label">任务描述</div>
        <div class="item-desc">{{detail && detail.desc || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'query'">
        <div class="item-label">用途描述</div>
        <div class="item-desc">{{detail && detail.desc || '-'}}</div>
      </div>
      <div class="cont-item">
        <div class="item-label">选定数据集</div>
        <div class="item-desc">{{detail && detail.dataset || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'model'">
        <div class="item-label">选定模型</div>
        <div class="item-desc">{{detail && detail.model || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'query'">
        <div class="item-label">数据类型列表</div>
        <div
          class="item-desc"
        >{{detail && detail.datasetType && detail.datasetType.length > 0 ? detail.datasetType.join('、') : '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'query'">
        <div class="item-label">查询名单</div>
        <div class="item-desc btn">
          <div>
            <img :src="require('../../../../assets/usercenter/chainAudit/detail-hover.png')" />
            <span>查看详细名单</span>
          </div>
        </div>
      </div>
      <div class="cont-item">
        <div class="item-label">数据使用目的</div>
        <div class="item-desc">{{detail && detail.goal || '-'}}</div>
      </div>
      <div class="cont-item">
        <div class="item-label">订单积分</div>
        <div class="item-desc">{{detail && detail.point || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'model'">
        <div class="item-label">审核方</div>
        <div class="item-desc">{{detail && detail.auditor || '-'}}</div>
      </div>
      <div class="cont-item" v-show="type == 'model'">
        <div class="item-label">审核结果</div>
        <div class="item-desc result">
          <img
            :src="detail && detail.result == true ? require('../../../../assets/usercenter/chainAudit/success.png') : require('../../../../assets/usercenter/chainAudit/error.png')"
          />
          <span
            :style="detail && detail.result == true ? {color:'#62ba46'} : {color:'#fa7437'}"
          >{{detail && detail.result == true ? '通过' : '驳回'}}</span>
        </div>
      </div>
      <div class="cont-item" v-show="type == 'model'">
        <div class="item-label">审核时间</div>
        <div class="item-desc">{{detail && detail.auditTime || '-'}}</div>
      </div>
      <div class="cont-item">
        <div class="item-label">相关条款</div>
        <div
          class="item-desc"
          :style="{fontWeight: 'bold',color: '#475886',cursor: 'pointer'}"
        >{{detail && detail.about || '-'}}</div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "chainAuditDetail",
  components: {},
  mounted() {},
  data() {
    return {
      type: this.$router.history.current.params.type || 'query',
      detail: {
        orderId: "24515887454dsdsedw",
        orderTime: "2020-07-15  12:00:00",
        user: "贵阳银行",
        provider: "唐明川",
        desc: "相关的信息描述，相关的信息描述，相关的信息描述，相关的信息描述",
        dataset: "数据集1",
        model: "逻辑回归",
        datasetType: [
          "个人信息",
          "贷款信息",
          "公积金缴存明细",
          "公积金存缴证明"
        ],
        goal: "公共服务",
        point: 20000,
        auditor: "李文龙",
        result: false,
        auditTime: "2020-07-17 12:00:00",
        about: "《甲乙双方需要遵守的约定条款》"
      }
    };
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
@import "./ChainAuditDetail.scss";
</style>