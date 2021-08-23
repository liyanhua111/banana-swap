import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import './style.less'



export const ComingSoon = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const ComingSoon = (
    <div className="ComingSoonPage">
      <div className="ComingSoon">
        <img src={require('../../assets/img/page/btn.png')} alt="" className="homeLogo" />
        <p className="font1">{ t('COMINGSOON')}</p>
      </div>
    </div>
  );

  return ComingSoon;
};

