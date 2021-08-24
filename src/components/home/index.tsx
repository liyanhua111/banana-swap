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
        <div className="module1">
          <div className="maxWidth">
            <div className="homeHeader" id="page1">
              <img src={require('../../assets/img/logo.png')} alt="" className="homeLogo" />
              <p className="lang" onClick={()=>i18n.changeLanguage(i18n.language=='en'?'zh':'en')}>
                <img src={require('../../assets/img/nav/lang.png')} alt="" />
                {i18n.language=='en'?'EN':'中文'}
              </p>
            </div>
            <div className="bannerBox">
              <img src={require('../../assets/img/home/1.png')} alt=""/>
              <div className="banner">
                <img src={require('../../assets/img/home/bs.png')} alt=""/>
                {/* <div className="font1">{t("home1")}</div> */}
                <div className="font4">AMM <span className="su">|</span> IBO <span className="su">|</span> NFT <span className="su">|</span> Social  
                {/* <span className="font2">{t("home2")}</span> */}
                </div>
                <div className="font3">{t("home3")}</div>
                <div className="handBtn" onClick={() => history.push({ pathname: "/swap/index" })}>LAUNCH APP</div>
              </div>
            </div>
          </div>
        </div>
        <div className="section1" id="page2">
          <div className="maxWidth">
            {/* <img src={require('../../assets/img/home/2.png')} alt="" className="logoImg" /> */}
              <div className="font1">{t("homeTitle1")}<span className="subfont">ON SOLANA</span></div>
              <div className="cardBox">
                <div className="cardItem">
                  <img src={require('../../assets/img/home/3.png')} alt="" className="cardImg" />
                  <p className="cardFont1">{t("homesubTitle11")}</p>
                  <p className="cardFont2">{t("homeInfor11")}</p>
                </div>
                <div className="cardItem">
                  <img src={require('../../assets/img/home/4.png')} alt="" className="cardImg" />
                  <p className="cardFont1">{t("homesubTitle12")}</p>
                  <p className="cardFont2">{t("homeInfor12")}</p>
                </div>
                <div className="cardItem">
                  <img src={require('../../assets/img/home/5.png')} alt="" className="cardImg" />
                  <p className="cardFont1">{t("homesubTitle13")}</p>
                  <p className="cardFont2">{t("homeInfor13")}</p>
                </div>
                <div className="cardItem">
                  <img src={require('../../assets/img/home/5b.png')} alt="" className="cardImg" />
                  <p className="cardFont1">{t("homesubTitle14")}</p>
                  <p className="cardFont2">{t("homeInfor14")}</p>
                </div>
              </div>
          </div>
        </div>
        <div className="section2" id="page3">
          <div className="maxWidth">
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
                    {/* <img src={require('../../assets/img/dome1.png')} alt="" className={`tabImg ${activeIndex===1 ?'active':''}`}  onClick={changeActive} />
                    <img src={require('../../assets/img/dome1.png')} alt="" className={`tabImg ${activeIndex===1 ?'active':''}`}  onClick={changeActive} /> */}
                    <img src={require('../../assets/img/home/web.png')} alt="" className={`tabImg ${activeIndex===1 ?'active':''}`} />
                  </div>
                  <div className="slickBox">
                    <span className="slickDots active"></span>
                    <span className="slickDots"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section3" id="page4">
          <div className="maxWidth">
            <div className="contentBox">
              <p className="font1 title cellfont1">BANA CLUB</p>
              <img src={i18n.language == 'en'?require('../../assets/img/home/9b.png'):require('../../assets/img/home/9.png')} alt="" className="tabImg" />
              <div className="content">
                <p className="font1 title pcfont1">BANA CLUB</p>
                <p className="font2"><span className="font3">BANA CLUB </span>{t("homeInfor41")}</p>
                <p className="font2"><span className="font3">BANA CARD </span>{t("homeInfor42")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section4" id="page5">
          <div className="maxWidth">
            <div>
              <p className="title">{t("homeTitle5")}</p>
              <div className="equity">
                <div className="equityL">
                  <div className="position position1">{t("homeInfor53")}</div>
                  <div className="position position2">{t("homeInfor54")}</div>
                  <div className="position position3">{t("homeInfor55")}</div>
                  <div className="equityLItem">
                    <p>BANA</p>
                    <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                  </div>
                  <div className="equityLItem">
                    <p>SRM</p>
                    <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                  </div>
                  <div className="equityLItem">
                    <p>OXY</p>
                    <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                  </div>
                  <div className="equityLItem dianBox">
                    <p className="dian">...</p>
                    <p className="placeholder"></p>
                  </div>
                  <div className="equityLItem">
                    <p>UNI</p>
                    <img src={require('../../assets/img/homeIcon.png')} className="placeholder" alt=""/>
                  </div>

                </div>
                <div className="equityC">
                  <p className="font1">BANA CARD <br /> BANANA CLUB</p>
                  <p className="font2">{t("homeInfor51")}</p>
                  <p className="font3">{t("homeInfor52")}</p>
                </div>
                <div className="equityR">
                  <div className="position position1">{t("homeInfor56")}</div>
                  <div className="equityRItem">
                    <p className="placeholder"></p>
                    <div className="equityRSubItem">
                      <p className="classify classify1">{t("homeInfor57")}</p>
                      <p className="classifyInfo">{t('homeInfor510')}</p>
                    </div>
                  </div>
                  <div className="equityRItem">
                    <img src={require('../../assets/img/homeIcon.png')} alt="" className="placeholder" />
                    <div className="equityRSubItem">
                      <p className="classify classify2">{t("homeInfor58")}</p>
                      <p className="classifyInfo">{t("homeInfor510")}</p>
                    </div>
                  </div>
                  <div className="equityRItem">
                    <p className="placeholder"></p>
                    <div className="equityRSubItem">
                      <p className="classify classify3">{t("homeInfor59")}</p>
                      <p className="classifyInfo">{t("homeInfor510")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section5" id="page6">
          <div className="maxWidth">
            <div>
              <div className="title"><span> BANANA </span>MAN</div>
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
        </div>
        <div className="section6" id="page7">
          <div className="maxWidth">
            <p className="font1"><img src={require('../../assets/img/home/7.png')} alt=""/> {t("homeTitle6")}</p>
            <div className="contentBox">
              <ul>
                <li className="headerBox">
                  <p>2021 Q2</p>
                </li>
                <li>{t("homeInfor611")}</li>
                <li>{t("homeInfor612")}</li>
                <li>{t("homeInfor613")}</li>
                <li>{t("homeInfor614")}</li>
                <li className="teamImg"><img src={require('../../assets/img/team1.png')} alt=""/></li>
              </ul>
              <ul>
                <li className="headerBox active">
                  <p>2021 Q3</p>
                </li>
                <li>{t("homeInfor621")}</li>
                <li>{t("homeInfor622")}</li>
                <li>{t("homeInfor623")}</li>
                <li>{t("homeInfor624")}</li>
                <li>{t("homeInfor625")}</li>
                <li className="teamImg"><img src={require('../../assets/img/team2.png')} alt=""/></li>
              </ul>
              <ul>
                <li className="headerBox">
                  <p>2021 Q4</p>
                </li>
                <li>{t("homeInfor631")}</li>
                <li>{t("homeInfor632")}</li>
                <li>{t("homeInfor633")}</li>
                <li>{t("homeInfor634")}</li>
                <li>{t("homeInfor635")}</li>
                <li className="teamImg"><img src={require('../../assets/img/team3.png')} alt=""/></li>
              </ul>
              <ul>
                <li className="headerBox">
                  <p>2022 Q1</p>
                </li>
                <li>{t("homeInfor641")}</li>
                <li>{t("homeInfor642")}</li>
                <li>{t("homeInfor643")}</li>
                <li>{t("homeInfor644")}</li>
                <li className="teamImg"><img src={require('../../assets/img/team5.png')} alt=""/></li>
              </ul>
              <ul>
                <li className="headerBox">
                  <p>2022 Q2</p>
                </li>
                <li>{t("homeInfor651")}</li>
                <li>{t("homeInfor652")}</li>
                <li>{t("homeInfor653")}</li>
                <li>{t("homeInfor654")}</li>
                <li className="teamImg"><img src={require('../../assets/img/team4.png')} alt=""/></li>
              </ul>
            </div>
          </div>
          <div className="bottomBg"></div>
        </div>
        <div className="section7" id="page8">
          <div className="maxWidth">
            <div className="contactBox">
              <div className="contactContent">
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
              <img src={require('../../assets/img/home/1.png')} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return HomePage;
};

