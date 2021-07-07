import React from "react";
import { useHistory } from "react-router-dom";
import './home.less'


export const Home = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const HomePage = (
    <div className="homePage">
      <div className="homeContent">
        <div className="maxWidth">
          <div className="homeHeader">
            <img src={require('../../assets/img/logo.png')} alt="" className="homeLogo"/>
          </div>
          <div className="bannerBox">
            <div className="banner">
              <div className="font1">从这里打开你的<span style={{color:"#222"}}>DeFi</span>乐园</div>
              <div className="font2">AMM<span className="font4"> | </span>IBO<span className="font4"> | </span>Social<span className="font4"> | 高易用性链上基础设施</span></div>
              <div className="font3">BananaSwap 是一个运行在 Solana 上、采用聚合流动性设计的AMM资产交易平台。其新特性支持区间做市、限价单、NFT LP等功能，此外，BananaSwap还提供一套聚合型Dashboard交易数据看板，提供真正的一站式交易体验。</div>
              {/* <div className="handBtn" onClick={() => history.push({ pathname: "/swap/index" })}>LAUNCH APP</div> */}
              <div className="handBtn">LAUNCH APP</div>
            </div>
            <img src={require('../../assets/img/homeSubBg1.png')} alt=""/>
          </div>
          <div className="section1">
            <div className="font1">前所未有的交易体验<span className="subfont">IN SOLANA</span></div>
            <div className="cardBox">
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg1.png')} alt="" className="cardImg" />
                <p className="cardFont1">灵活做市</p>
                <p className="cardFont2">流动性提供者将拥有更大的灵活性和更高的资金利用率，所有交易者将享受更强大的流动性。</p>
              </div>
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg2.png')} alt="" className="cardImg" />
                <p className="cardFont1">资产发行</p>
                <p className="cardFont2">体验轻松多样化的上币及流动性创建流程，投资者及项目方双向权益皆可获得最大保障。</p>
              </div>
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg3.png')} alt="" className="cardImg" />
                <p className="cardFont1">一站式DeFi工具</p>
                <p className="cardFont2">一站式完成你的DeFi市场操作，包括交易，挖矿，质押，IDO及多样化功能。</p>
              </div>
            </div>
          </div>
          <div className="section2">
            <div className="barBox">
              强大的交易工具及基础模块
              <div className="addImg">
                <img src={require('../../assets/img/homeIcon2.png')} alt="" className="cardImg" />
              </div>
            </div>
            <div className="moduleBox">
              <div className="tabTitle">
                <p>区间做市</p>
                <p>限价订单</p>
                <p>LP/NFT</p>
                <p>费用调控</p>
                <p>聚合看板</p>
                <p>资产图表</p>
              </div>
              <div className="tabContent">
                <div className="tabLeft">
                  <p className="font1">完备的资产看板</p>
                  <p className="font2">提供一套可视化的聚合看板和资产交易仪表盘，一站式满足所有数据需求，支持外部API接入，为更复杂的做市组合提供更简单选择。</p>
                </div>
                <div className="switchBox">
                  <div className="switch">
                    <img src={require('../../assets/img/dome1.png')} alt="" className="tabImg"/>
                    <img src={require('../../assets/img/dome2.png')} alt="" className="tabImg"/>
                  </div>
                  <div className="slickBox">
                    <span className="slickDots active"></span>
                    <span className="slickDots"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section3">
            <div className="contentBox">
              <img src={require('../../assets/img/homeImg4.png')} alt="" className="tabImg" />
              <div className="content">
                <p className="font1">BANA CLUB</p>
                <p className="font2">BANA CLUB是一个Solana上的链上会员联盟，基于BANA DAO衍生生态，引入了一套去中心化的产品会员体系和DID链上信用评级系统，首创链上社交化金融，加速DeFi 3.0基础建设。</p>
                <p className="font2">BANA CARD 是俱乐部联盟中的身份识别卡片。持有 BANA CARD，享受额外的DeFi平台专属权益，手续费折扣等权益，IBO的认购份额，将享有手续费分红折扣、IBO认购份额、提案和投票权以及诸如预言机、仪表盘数据调用权限等各平台独立权益。</p>
              </div>
            </div>
          </div>
          <div className="section4">
            <p className="title">BANA CARD权益联盟</p>
            <div className="equity">
              <div className="equityL">
                <div className="equityLItem">
                  <p><i>BANA</i></p>
                  <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                </div>
                <div className="equityLItem">
                  <p><i>SRM</i></p>
                  <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                </div>
                <div className="equityLItem">
                  <p><i>OXY</i></p>
                  <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                </div>
                <div className="equityLItem">
                  <div className="dian"><span></span><span></span><span></span></div>
                  <p className="placeholder"></p>
                </div>
                <div className="equityLItem">
                  <p><i>UNI</i></p>
                  <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                </div>
                <div className="position position1"><i>DeFi权益币资产池<br />（白名单扩展）</i></div>
                <div className="position position2"><i>将DeFi平台权益币抵<br />押进一个资产池</i></div>
                <div className="position position3"><i>资格评定<br />（白名单）</i></div>
              </div>
              <div className="equityC">
                <p className="font1"><i>BANA CARD <br /> BANANA CLUB</i></p>
                <p className="font2"><i>全品牌会员生态联盟</i></p>
                <p className="font3"><i>按照不同资产成分铸造合成BANA CARD，根据BANA CARD类型享受生态联盟中的所有平台权益委员会</i></p>
              </div>
              <div className="equityR">
                <div className="equityRItem">
                  <p className="placeholder"></p>
                  <div className="equityRSubItem">
                    <p className="classify"><i>青香蕉</i></p>
                    <p className="classifyInfo"><i>获得生态联盟的手续<br/>费分红</i></p>
                  </div>
                </div>
                <div className="equityRItem">
                  <img src={require('../../assets/img/homeIcon.png')} alt="" className="placeholder" />
                  <div className="equityRSubItem">
                    <p className="classify"><i>银香蕉</i></p>
                    <p className="classifyInfo"><i>享受生态联盟的手续<br/>费折扣</i></p>
                  </div>
                </div>
                <div className="equityRItem">
                  <p className="placeholder"></p>
                  <div className="equityRSubItem">
                    <p className="classify"><i>金香蕉</i></p>
                    <p className="classifyInfo"><i>享受生态联盟的IDO<br/>认购份额</i></p>
                  </div>
                </div>
                <div className="position position1"><i>兼具NFT功能，收藏、<br />转移、拍卖 …</i></div>
              </div>
            </div>
          </div>
          <div className="section5">
            <p className="hen"></p>
            <p className="font1">路线图</p>
            <div className="headerBox">
              <p>2021 Q2</p>
              <p className="active">2021 Q3</p>
              <p>2021 Q4</p>
              <p>2022 Q1</p>
              <p>2022 Q2</p>
            </div>
            <div className="contentBox">
              <ul>
                <li>完成整体设计架构</li>
                <li>solana上的测试版本合约代码审计</li>
                <li>合作预言机接入</li>
                <li>BananaSwap Farm</li>
                <li>上线IBO资产发行</li>
              </ul>
              <ul>
                <li>AMM流动性聚合</li>
                <li>支持范围限价订单</li>
                <li>价格区间流动性提供</li>
                <li>非同质化流动性证明</li>
                <li>引入多级费率模型</li>
              </ul>
              <ul>
                <li>BNANACLUB</li>
                <li>发行首期BANA CARD</li>
                <li>BANA CARD铸造池</li>
                <li>NFT碎片化解决方案</li>
                <li>引入链上DID信用评级</li>
              </ul>
              <ul>
                <li>NFT包装资产收益管理</li>
                <li>NFT收益策略</li>
                <li>主动性LP管理平台</li>
                <li>自托管投资机枪池</li>
              </ul>
              <ul>
                <li>启动多链部署计划</li>
                <li>混合型跨链桥</li>
                <li>跨链资产兑换</li>
                <li>聚合交易仪表盘</li>
              </ul>
            </div>
          </div>
          <div className="section6">
            <p className="line"></p>
            <div className="logoBox">
              <img src={require('../../assets/img/logo.png')} alt="" />
              <p>EMAIL：CONTACT@BANANASWAP.NET</p>
            </div>
          </div>
        </div>
        <img src={require('../../assets/img/homeSubBg2.png')} alt="" className="footBg"/>
      </div>
    </div>
  );

  return HomePage;
};

