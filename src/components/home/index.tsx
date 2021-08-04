import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { Popover } from 'antd';
import { useTranslation, Trans, Translation } from 'react-i18next'
import './home.less'


export const Home = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [activeIndex, changeActiveIndex] = useState(1)
  const [page, setPage] = useState(2)
  const pageTotal = 8
  const changeActive = () => {
    changeActiveIndex(activeIndex===1?2:1)
  }
  const Submit = () => {
    if (page >= pageTotal) {
      setPage(1)
    } else {
      setPage(page + 1)
    }
    var homePage = document.querySelector('#homePage')
    var PageId = document.querySelector('#page' + page)
    // @ts-ignore
    homePage.scrollTo({
       // @ts-ignore
      'top': PageId.offsetTop,
      'behavior': 'smooth'
    })
  }
  const HomePage = (
    <div id="homePage" className={`homePage ${i18n.language == 'en' ? 'homePageEn' : ''}`}>
      <div className="arrowBtn" onClick={Submit}>«</div>
      <div className="homeContent">
        <div className="maxWidth">
          <div className="homeHeader" id="page1">
            <img src={require('../../assets/img/logo.png')} alt="" className="homeLogo" />
            <p className="lang" onClick={()=>i18n.changeLanguage(i18n.language=='en'?'zh':'en')}>
              <img src={require('../../assets/img/nav/lang.png')} alt="" />
              {i18n.language=='en'?'EN':'中文'}
            </p>
          </div>
          <div className="bannerBox">
            <div className="banner">
              {/* <div className="font1">从这里打开你的<span style={{color:"#222"}}>DeFi</span>乐园</div> */}
              <div className="font1">{t("home1")}</div>
              <div className="font2">AMM<span className="font4"> | </span>IBO<span className="font4"> | </span>Social<span className="font4"> | {t("home2")}</span></div>
              <div className="font3">{t("home3")}</div>
              <div className="handBtn" onClick={() => history.push({ pathname: "/swap/index" })}>LAUNCH APP</div>
              {/* <div className="handBtn">LAUNCH APP</div> */}
            </div>
            <img src={require('../../assets/img/homeSubBg1.png')} alt=""/>
          </div>
          <div className="section1" id="page2">
            <div className="font1">{t("homeTitle1")}<span className="subfont">IN SOLANA</span></div>
            <div className="cardBox">
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg1.png')} alt="" className="cardImg" />
                <p className="cardFont1">{t("homesubTitle11")}</p>
                <p className="cardFont2">{t("homeInfor11")}</p>
              </div>
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg2.png')} alt="" className="cardImg" />
                <p className="cardFont1">{t("homesubTitle12")}</p>
                <p className="cardFont2">{t("homeInfor12")}</p>
              </div>
              <div className="cardItem">
                <img src={require('../../assets/img/homeImg3.png')} alt="" className="cardImg" />
                <p className="cardFont1">{t("homesubTitle13")}</p>
                <p className="cardFont2">{t("homeInfor13")}</p>
              </div>
            </div>
          </div>
          <div className="section2" id="page3">
            <div className="barBox">
              {t("homeTitle2")}
              <div className="addImg">
                <img src={require('../../assets/img/homeIcon2.png')} alt="" className="cardImg" />
              </div>
            </div>
            <div className="moduleBox">
              <div className="tabTitle">
                <p>{t("homeInfor21")}</p>
                <p>{t("homeInfor22")}</p>
                <p>{t("homeInfor23")}</p>
                <p>{t("homeInfor24")}</p>
                <p>{t("homeInfor25")}</p>
                <p>{t("homeInfor26")}</p>
              </div>
              <div className="tabContent">
                <div className="tabLeft">
                  <p className="font1">{t("homeTitle3")}</p>
                  <p className="font2">{t("homeInfor31")}</p>
                </div>
                <div className="switchBox">
                  <div className="switch">
                    <img src={require('../../assets/img/dome1.png')} alt="" className={`tabImg ${activeIndex===1 ?'active':''}`}  onClick={changeActive} />
                    <img src={require('../../assets/img/dome2.png')} alt="" className={`tabImg ${activeIndex===2 ?'active':''}`}  onClick={changeActive} />
                  </div>
                  <div className="slickBox">
                    <span className="slickDots active"></span>
                    <span className="slickDots"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section3" id="page4">
            <div className="contentBox">
              <img src={i18n.language == 'en'?require('../../assets/img/homeImg5.png'):require('../../assets/img/homeImg4.png')} alt="" className="tabImg" />
              <div className="content">
                <p className="font1 title">BANA CLUB</p>
                <p className="font2">{t("homeInfor41")}</p>
                <p className="font2">{t("homeInfor42")}</p>
              </div>
            </div>
          </div>
          <div className="section4" id="page5">
            <div>
              <p className="title">{t("homeTitle5")}</p>
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
                  <div className="position position1"><i>{t("homeInfor53")}</i></div>
                  <div className="position position2"><i>{t("homeInfor54")}</i></div>
                  <div className="position position3"><i>{t("homeInfor55")}</i></div>
                </div>
                <div className="equityC">
                  <p className="font1"><i>BANA CARD <br /> BANANA CLUB</i></p>
                  <p className="font2"><i>{t("homeInfor51")}</i></p>
                  <p className="font3"><i>{t("homeInfor52")}</i></p>
                </div>
                <div className="equityR">
                  <div className="equityRItem">
                    <p className="placeholder"></p>
                    <div className="equityRSubItem">
                      <p className="classify"><i>{t("homeInfor57")}</i></p>
                      <p className="classifyInfo"><i>{t('homeInfor510')}</i></p>
                    </div>
                  </div>
                  <div className="equityRItem">
                    <img src={require('../../assets/img/homeIcon.png')} alt="" className="placeholder" />
                    <div className="equityRSubItem">
                      <p className="classify"><i>{t("homeInfor58")}</i></p>
                      <p className="classifyInfo"><i>{t("homeInfor510")}</i></p>
                    </div>
                  </div>
                  <div className="equityRItem">
                    <p className="placeholder"></p>
                    <div className="equityRSubItem">
                      <p className="classify"><i>{t("homeInfor59")}</i></p>
                      <p className="classifyInfo"><i>{t("homeInfor510")}</i></p>
                    </div>
                  </div>
                  <div className="position position1"><i>{t("homeInfor56")}</i></div>
                </div>
              </div>
            </div>
          </div>
          <div className="section5" id="page6">
            <div>
              <div className="title">BANANA MAN</div>
              <div className="teamBox">
                <a href="https://twitter.com/0xbana" target="_blank" >
                  <div className="teamItem">
                    <div>
                      <img src={require('../../assets/img/team1.png')} alt="" />
                      <p className="teamName">0xbana</p>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/0xSakuya" target="_blank" >
                  <div className="teamItem">
                    <div>
                      
                      <img src={require('../../assets/img/team2.png')} alt="" />
                      <p className="teamName">0xsakuya</p>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/0xPeter101" target="_blank" >
                  <div className="teamItem">
                    <div>
                      <img src={require('../../assets/img/team3.png')} alt="" />
                      <p className="teamName">0xpeter</p>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/0xBruce" target="_blank" >
                  <div className="teamItem">
                    <div>
                      <img src={require('../../assets/img/team4.png')} alt="" />
                      <p className="teamName">0xbruce</p>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/0xSelena" target="_blank" >
                  <div className="teamItem">
                    <div>
                      <img src={require('../../assets/img/team5.png')} alt="" />
                      <p className="teamName">0xselena</p>
                    </div>
                  </div>
                </a>
                <a href="https://twitter.com/0xPlantain" target="_blank" >
                  <div className="teamItem">
                    <div>
                      <img src={require('../../assets/img/team6.png')} alt="" />
                      <p className="teamName">0xplantain</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="section6" id="page7">
            <p className="hen"></p>
            <p className="font1">{t("homeTitle6")}</p>
            <div className="headerBox">
              <p>2021 Q2</p>
              <p className="active">2021 Q3</p>
              <p>2021 Q4</p>
              <p>2022 Q1</p>
              <p>2022 Q2</p>
            </div>
            <div className="contentBox">
              <ul>
                <li>{t("homeInfor611")}</li>
                <li>{t("homeInfor612")}</li>
                <li>{t("homeInfor613")}</li>
                <li>{t("homeInfor614")}</li>
                <li>{t("homeInfor615")}</li>
              </ul>
              <ul>
                <li>{t("homeInfor621")}</li>
                <li>{t("homeInfor622")}</li>
                <li>{t("homeInfor623")}</li>
                <li>{t("homeInfor624")}</li>
                <li>{t("homeInfor625")}</li>
              </ul>
              <ul>
                <li>{t("homeInfor631")}</li>
                <li>{t("homeInfor632")}</li>
                <li>{t("homeInfor633")}</li>
                <li>{t("homeInfor634")}</li>
                <li>{t("homeInfor635")}</li>
              </ul>
              <ul>
                <li>{t("homeInfor641")}</li>
                <li>{t("homeInfor642")}</li>
                <li>{t("homeInfor643")}</li>
                <li>{t("homeInfor644")}</li>
              </ul>
              <ul>
                <li>{t("homeInfor651")}</li>
                <li>{t("homeInfor652")}</li>
                <li>{t("homeInfor653")}</li>
                <li>{t("homeInfor654")}</li>
              </ul>
            </div>
          </div>
          <div className="section7" id="page8">
            <p className="line"></p>
            <div className="contactBox">
              <p className="title">CONTACT US</p>
              <div className="contact">
              <a href="https://twitter.com/BananaSwap_net" target="_blank" ><img src={require("../../assets/img/relative/1.png")} alt="" /></a>
              <a href="https://discord.gg/AWmXjCECgm" target="_blank"><img src={require("../../assets/img/relative/2.png")} alt=""/></a>
              <a href="https://github.com/bananadefilabs-001" target="_blank"><img src={require("../../assets/img/relative/3.png")} alt="" /></a>
              <Popover content={"contact@bananaswap.net"} title="邮箱地址">
                <a><img src={require("../../assets/img/relative/4.png")} alt=""/></a>
              </Popover>
              <a href="https://www.facebook.com/BananaSwap" target="_blank"><img src={require("../../assets/img/relative/5.png")} alt=""/></a>
              <a href="https://t.me/banana_swap" target="_blank"><img src={require("../../assets/img/relative/6.png")} alt=""/></a>
              <a href="https://bananaswap-net.medium.com/" target="_blank"><img src={require("../../assets/img/relative/7.png")} alt=""/></a>
              </div>
            </div>
            <div className="logoBox">
              <img src={require('../../assets/img/logo.png')} alt="" />
              {/* <p>EMAIL：CONTACT@BANANASWAP.NET</p> */}
            </div>
          </div>
        </div>
        <img src={require('../../assets/img/homeSubBg2.png')} alt="" className="footBg"/>
      </div>
    </div>
  );

  return HomePage;
};

