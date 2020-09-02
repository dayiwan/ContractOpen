<template>
  <div class="tab2-page">
    <div class="party-item" v-for="(item,index) in list" :key="item.party">
      <div class="title">
        参与方{{index+1}}：
        <span>{{item.party}}</span>
      </div>
      <div class="cont">
        <div v-for="subitem in item.operation" :key="subitem.name">
          <div class="btn">
            <span @click="check(item,subitem)">{{subitem.name}}</span>
          </div>
          <div class="result" :ref="`${item.party}-${subitem.name}`">
            <div class="status" v-show="subitem.success != null">
              <img
                :src="subitem.name.indexOf('状态')> -1 ? 
                subitem.success ? 
                require('../../../../../assets/usercenter/taskschedule/status-success.png') : 
                require('../../../../../assets/usercenter/taskschedule/status-error.png') 
                : 
                subitem.success ? 
                require('../../../../../assets/usercenter/taskschedule/success.png') : 
                require('../../../../../assets/usercenter/taskschedule/error.png')"
              />
              <span
                :style="subitem.success ? {color: '#52c41a'} : {color: '#fa7437'}"
              >{{subitem.name.indexOf('状态')> -1 ? subitem.success ? '状态正常' : '状态异常' : subitem.success ? '成功' : '失败'}}</span>
            </div>
            <div
              class="desc"
              v-show="subitem.success != null"
              :style="subitem.desc != null && {marginTop: '15px'}"
            >
              <div v-for="(descitem,index) in subitem.desc" :key="index">
                <span class="param">{{descitem.key}}:</span>
                <span class="param-value">{{descitem.value}}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="item.operation && item.operation.length % 2 != 0">
          <div class="btn">
            <span :style="{visibility:'hidden'}">占位占位</span>
          </div>
          <div class="result"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "tab2",
  components: {},
  mounted() {},
  data() {
    return {
      list: [
        {
          party: "公积金中心",
          operation: [
            { name: "状态检查", success: true, desc: null },
            {
              name: "数据准备",
              success: true,
              desc: [
                { key: "dataset name", value: "credit_a" },
                { key: "dataset namespace", value: "credit_a_host" }
              ]
            }
          ]
        },
        {
          party: "农商银行",
          operation: [
            {
              name: "状态检查",
              success: false,
              desc: [
                { key: "dataset name", value: "credit_a" },
                { key: "dataset namespace", value: "credit_a_host" }
              ]
            },
            {
              name: "数据准备",
              success: false,
              desc: [
                { key: "dataset name", value: "credit_a" },
                { key: "dataset namespace", value: "credit_a_host" }
              ]
            },
            { name: "任务提交", success: null, desc: null },
            { name: "状态查询", success: null, desc: null },
            { name: "评估验证", success: null, desc: null }
          ]
        }
      ]
    };
  },
  methods: {
    check: function(item, subitem) {
      let itemIndex = this.list.findIndex(d => {
        return d.party == item.party;
      });
      if (itemIndex > -1) {
        let subitemIndex = item.operation.findIndex(d => {
          return d.name == subitem.name;
        });
        if (subitemIndex > -1) {
          // 请求接口返回检查结果
          // 模拟异步请求
          let _this = this;
          let dom = _this.$refs[`${item.party}-${subitem.name}`][0];
          let loadingInstance = Loading.service({
            target: dom
          });
          setTimeout(function() {
            item.operation.splice(subitemIndex, 1, {
              ...subitem,
              success: true,
              desc: [
                { key: "dataset name", value: "credit_a" },
                { key: "dataset namespace", value: "credit_a_host" }
              ]
            });
            _this.list.splice(itemIndex, 1, item);
            loadingInstance.close();
          }, 2000);
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./Tab2.scss";
</style>