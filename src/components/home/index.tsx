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
              <div className="font1">满足一切金融需求的<span className="font5">DEX</span></div>
              <div className="font2">AMM<span className="font4"> | </span>IDO<span className="font4"> | </span>DeF<span className="font4"> | 高易用性链上基础设施</span></div>
              <div className="font3">BANANASWAP 致力于为用户提供超 CEX 级别的交易体验，以建立一个简单易用、可组合性强、可灵活定制的去中心化金融基础设施，满足不同用户间的去中心化金融服务需求。</div>
              {/* <div className="handBtn" onClick={() => history.push({ pathname: "/swap" })}>LAUNCH APP</div> */}
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
                <p className="font2">BANANA CLUB是一个基于去中心化治理的会员联盟。BANANA CLUB由三种类型的角色构成，也代表整个系统中的三个生态，平台、会员、委员会，带动Solana生态乃至整个DeFi世界的良性发展。 </p>
                <p className="font2">vBANA 是俱乐部联盟中的身份识别卡片。持有 vBANA，将享有手续费分红折扣、IDO认购份额、提案和投票权以及诸如预言机、仪表盘数据调用权限等各平台独立权益。 </p>
              </div>
            </div>
          </div>
          <div className="section4">
            <p className="title">VBANA权益联盟</p>
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
                <p className="font1"><i>vBANA <br /> BANANA CLUB</i></p>
                <p className="font2"><i>全品牌会员生态联盟</i></p>
                <p className="font3"><i>按照不同资产成分铸造合成vBANA，根据vBANA类型享受生态联盟中的所有平台权益委员会</i></p>
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
              <p>2021 Q3</p>
              <p className="active">2021 Q4</p>
              <p>2022 Q1</p>
              <p>2022 Q2</p>
              <p>2022 Q3</p>
            </div>
            <div className="contentBox">
              <ul>
                <li>完成BANANASWAP整体设计架构</li>
                <li>发布SOLANA上的测试版本</li>
                <li>合约代码审计</li>
                <li>AMM去中心化交易平台</li>
              </ul>
              <ul>
                <li>AMM流动性聚合</li>
                <li>支持范围限价订单</li>
                <li>价格区间流动性</li>
                <li>提供非同质化流动性证明</li>
                <li>引入多级费率模型</li>
                <li>TWAP历史预言机</li>
              </ul>
              <ul>
                <li>BNANACLUB</li>
                <li>NFT交易拍卖</li>
                <li>NFT游戏分发平台</li>
                <li>NFT包装资产收益管理</li>
                <li>NFT碎片化解决方案</li>
              </ul>
              <ul>
                <li>衍生品</li>
                <li>合成资产</li>
                <li>杠杆借贷</li>
                <li>永续合约</li>
                <li>二元期权</li>
              </ul>
              <ul>
                <li>启动多链部署计划</li>
                <li>混合型跨链桥</li>
                <li>跨链资产兑换</li>
                <li>聚合交易</li>
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

