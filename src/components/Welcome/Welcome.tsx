// Copyright 2023 Paion Data. All rights reserved.
import React from "react";

import styles from "./Welcome.module.css";
import Messier61Logo from "./messier-61-logo.svg";

interface WelcomeProps {
  headLineMessage: string;
  subHeadLineMessage: string;
}

/**
 * The components shows welcome-page
 */
const Welcome = (props: WelcomeProps): JSX.Element => {
  return (
    <div className={`${styles.onboarding}`}>
      <div className={`${styles.onboarding_content}`}>
        <img className={[styles.animated, styles.fadeIn].join(" ")} src={Messier61Logo} alt="Messier 61 Logo" />
        <div className={[styles.headline, styles.animated, styles.fadeInUp].join(" ")}>{props.headLineMessage}</div>
        <div className={[styles.subtitle_1, styles.mt_3, styles.animated, styles.fadeInUp, styles.wait_p1s].join(" ")}>
          {props.subHeadLineMessage}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
