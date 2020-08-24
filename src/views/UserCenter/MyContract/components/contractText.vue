<template>
  <div class="contract-text">
    <div class="number">契约号:{{data.contractNumber}}
    </div>
    <div class="title">数据资源使用契约协议</div>
    <div class="content">
      <div class="part">
        甲方:
        <span>平台运营方</span>
      </div>
      <div class="part">
        乙方:
        <span>{{data.userName}}</span>
      </div>
      <div class="use">
        数据内容及用途:
        <span>非密</span>
      </div>
      <div class="content-one">我单位由于项目需要向贵阳市大数据集团申请使用{{data.dataSetList}}，为规范上述数据集使用，保证数据应用安全，防止数据泄密，特签订如下协议。</div>
      <div class="content-two">一、乙方必须遵守以下使用协议</div>
      <div class="content-one">1、乙方从公共数据资源开放平台获取的数据服务享有受限使用权，仅限于在我保费定价项目范围内使用，不得透露给任何第三方。</div>
      <div class="content-one">2、乙方必须在使用数据服务所形成的成果的显著位置注明该数据版权的所有者。</div>
      <div class="content-one">3、乙方对许可使用的数据服务不拥有复制、传播、出版、翻译成外国语言等权利,不得以商业目的使用该数据服务结果或者开发和生产其他产品。乙方可根据需要对数据结果内容进行必要的修改和对数据格式进行转换，但未经许可不得将修改、转换后的数据对外发布和提供,并须将修改、转换的情况及修改、转换的内容向管理方备案。</div>
      <div class="content-one">4、不得使用数据结果从事危害国家安全、社会公共利益和他人合法权益的活动。</div>
      <div class="content-one">5、若使用方违反本协议规定，甲方有权责令使用方停止使用数据结果并归还提供给方,且将再复制的该数据及其衍生品全部删除。</div>
      <div class="content-one">6、在数据使用期限内，甲方有权对乙方数据成果使用情况、数据存储设备管理情况、数据保密管理情况进行检查。如发现存在严重泄密倾向，将有权责令乙方停止使用数据结果，归还数据结果，将再复制的该数据及其衍生品全部删除。</div>
      <div class="content-two">二、乙方必须遵守以下保密协议</div>
      <div class="content-one">1、乙方必须按国家有关保密法律法规的要求，采取有效的保密措施，确保资料安全，严防丢失泄密。</div>
      <div class="content-one">2、使用数据仅限用于申请使用的范围，不得挪作他用。发表论文、报告、讲话等涉及数据内容应书面告知甲方。</div>
      <div class="content-one">3、乙方在本单位内须严格数据使用管理，控制数据知悉范围，建立专人负责制度，制定领用管理合帐，告知使用人员保密要求，并与数据使用人员签订《保密承诺书》。</div>
      <div class="content-one">4、使用方必须设置数据专用计算机，专人负责，专机专用。数据专用计算机禁止连接互联网，禁止通过网络传输数据信息。不得将数据或衍生成果在互联网上登载。</div>
      <div class="content-two">三、违约责任</div>
      <div class="content-one">1、乙方使用数据违反有关保密规定的，依照《中华人民共和国保密法》《中华人民共和国测绘成果管理规定》等有关法律法规的规定处理。</div>
      <div class="content-one">2、乙方违反本协议规定的，甲方有权对因此造成的损失要求赔偿;构成犯罪的，由司法机关霹究其刑事责任。</div>
      <div class="content-one">3、因乙方使用或保管数据不当，导致知识产权纠纷或失密事件，由乙方负全部法律责任</div>
      <div class="content-two">四、本协议为电子契约，与纸质协议具有相同的法律效力。</div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    },
}
</script>

<style lang="scss" scoped>
.contract-text {
  width: 60%;
  margin-left: 20%;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 50px 80px 50px;
  .number {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .title {
    font-size: 25px;
    font-weight: bolder;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .content {
    div {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    .part {
      font-weight: bolder;
    }
    .use {
      font-weight: bolder;
      span {
        margin-left: 30px;
        font-weight: normal;
      }
    }
    &-one, &-two {
      text-align: justify;
      text-indent: 2em;
    }
    &-two{
        font-weight: bolder;
    }
  }
}
</style>