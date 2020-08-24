<template>
  <div class="caseShow">
    <!-- tab栏 -->
    <caseTab
      @showCaseIndex="showCaseIndex"
      @showCaseBase="showCaseBase"
      @showSimulatData="showSimulatData"
      @showModelBase="showModelBase"
      @showEffectVerif="showEffectVerif"
    />
    <!-- 案例库 -->
    <caseBase :caseData="caseData" @openCase="openCase" v-if="showParam.showCase" />
    <!-- 案例详情 -->
    <caseDetail
      :detailData="caseDetailData"
      @canCase="canCase"
      @subCase="subCase"
      v-if="showParam.showCaseDetail"
    />
    <!-- 案例检查 -->
    <checkCase v-if="showParam.showCheckCase" />
    <!-- 仿真数据 -->
    <simulatData v-if="showParam.showSimula" :simulatDataData="simulatDataData" />
    <!-- 模型库 -->
    <modelBase v-if="showParam.showModel" :modelData="modelData" />
    <!-- 效果验证 -->
    <effectVerif v-if="showParam.showEffect" :effectData="effectData" />
  </div>
</template>


<script>
import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js';
import deepcopy from "deepcopy";
import caseTab from "./components/caseTab"; //tab栏
import caseBase from "./components/caseBase"; //案例库
import caseDetail from "./components/caseDetail"; //案例详情
import simulatData from "./components/simulatData"; //仿真数据
import checkCase from "./components/checkCase"; //状态检查
import modelBase from "./components/modelBase"; //模型库
import effectVerif from "./components/effectVerif"; //效果验证
import {
  getEffectDataApi,
  getCaseBaseApi,
  getSimulateDataApi,
  getModelBaseApi,
} from "@/api/FederatedLearn.js";
export default {
  name: "caseShow",
  components: {
    caseBase,
    caseDetail,
    simulatData,
    checkCase,
    caseTab,
    modelBase,
    effectVerif,
  },
  data() {
    return {
      //场景、相机、渲染器
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      //打开组件的参数
      showParam: {
        showCase: false, //案例库
        showCaseDetail: false, //具体案例
        showCheckCase: false, //案例检查
        showSimula: false, //仿真数据
        showModel: false, //模型库
        showEffect: false, //效果验证
      },
      //传入组件的数据
      caseDetailData: null,
      effectData: null,
      simulatDataData: null,
      caseData: null,
      modelData: null,
    };
  },
  methods: {
    //打开效果验证
    async showEffectVerif() {
      this.effectData = null;
      const data = {
        model_name: null,
        task_desc: null,
        parties: [],
        federalData: {},
        labelData: [],
        mergeData: {},
        lossData: {
          columns: ["num", "联邦学习", "数据聚合"],
          rows: [],
        },
      };
      const bashData = {
        columns: ["type", "value"],
        rows: [
          {
            type: "训练精度",
            value: 1,
          },
        ],
      };
      const res = await getEffectDataApi();
      data.model_name = res.base_info.model_name; //模型名称
      data.task_desc = res.base_info.task_desc; //任务名称
      data.federalData = deepcopy(bashData);
      data.federalData.rows[0]["value"] = res.acc.federal_learn_acc; //联邦学习仪表盘数据
      data.mergeData = deepcopy(bashData);
      data.mergeData.rows[0]["value"] = res.acc.merge_data_acc; //数据聚合仪表盘数据
      for (let bashItem of res.acc.party_alone_acc) {
        const party_alone = {
          trainData: null,
          party_name: null,
        };
        party_alone.trainData = deepcopy(bashData);
        party_alone.trainData.rows[0]["value"] = bashItem.party_acc;
        party_alone.party_name = bashItem.party_name;
        data.labelData.push(party_alone); //有label方训练精度仪表盘数据
      }
      for (let item of res.base_info.parties) {
        data.parties.push(item); //参与方数据
      }
      for (let i = 0; i < res.loss.loss_curve[0]["loss_values"].length; i++) {
        const lossDataRow = {
          num: i,
          联邦学习: res.loss.loss_curve[0]["loss_values"][i],
          数据聚合: res.loss.loss_curve[1]["loss_values"][i],
        };
        data.lossData.rows.push(lossDataRow);
      }
      this.effectData = data;
      this.makeShowParam();
      this.showParam.showEffect = true;
    },
    //打开模型库
    async showModelBase() {
      this.modelData = null;
      const res = await getModelBaseApi();
      this.modelData = res;
      this.makeShowParam();
      this.showParam.showModel = true;
    },
    //回到案例展示
    showCaseIndex() {
      this.makeShowParam();
    },
    //打开仿真数据
    async showSimulatData() {
      this.simulatDataData = null;
      const res = await getSimulateDataApi();
      this.simulatDataData = res;
      this.makeShowParam();
      this.showParam.showSimula = true;
    },
    //取消训练案例
    canCase() {
      this.showCaseBase();
    },
    //开始训练案例(状态检查)
    subCase(data) {
      this.makeShowParam();
      this.showParam.showCheckCase = true;
    },
    //打开具体案例
    openCase(data) {
      this.caseDetailData = data;
      this.makeShowParam();
      this.showParam.showCaseDetail = true;
    },
    //showParam全部置为false
    makeShowParam() {
      this.showParam = {
        showCase: false,
        showCaseDetail: false,
        showCheckCase: false,
        showSimula: false,
        showModel: false,
        showEffect: false,
      };
    },
    //展示案例库
    async showCaseBase() {
      this.caseData = null;
      const res = await getCaseBaseApi();
      this.caseData = res;
      this.makeShowParam();
      this.showParam.showCase = true;
    },

    init: function () {
      let container = document.getElementById("container");
      this.camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.01,
        10
      );
      this.camera.position.z = 0.6;
      this.scene = new THREE.Scene();
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0xFFFFFF, 1.0);
      container.appendChild(this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>


<style lang="scss" scoped>
.caseShow {
  display: flex;
  .caseBase {
    margin-top: 70px;
    left: 20px;
    position: fixed;
  }
  .caseDetail {
    position: fixed;
    margin-top: 70px;
    left: 25%;
  }
  .checkCase {
    position: fixed;
    left: 20px;
    margin-top: 70px;
  }
  .modelBase {
    position: fixed;
    margin-top: 70px;
    left: 20%;
  }
  .effectVerif,
  .simulatData {
    position: fixed;
    margin-top: 70px;
    left: 15%;
  }
}
</style>