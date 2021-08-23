import React from "react";
import { useHistory } from "react-router-dom";
import './style.less'


export const ComingSoon = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const history = useHistory();
  const ComingSoon = (
    <div className="ComingSoonPage">
      <div className="ComingSoon">
        <p className="font1">COMING SOON </p>
      </div>
    </div>
  );

  return ComingSoon;
};

