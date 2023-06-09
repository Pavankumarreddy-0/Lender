import React, { useState } from "react";
import robotStyle from "./RobotTxt.module.css";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";

export default function RobotsTxt() {
  const [robots, setRobots] = useState({
    roboTxt: "",
  });

  return (
    <>
      <div className={robotStyle["RobotsTxt_main"]}>
        <div className={robotStyle["RobotsTxt_headingContainerr"]}>
          <div className={robotStyle["RobotsTxt_heading"]}>
            <a
              className={robotStyle["RobotsTxt_link"]}
              href="/dashboard/settings/seo/"
            >
              <i class="bi bi-arrow-left"></i> SEO
            </a>
            <p className={robotStyle["RobotsTxt_paragraph"]}>
              Robots.txt Settings
            </p>
          </div>
        </div>
        <div className={robotStyle["RobotsTxt_content"]}>
          <div className={robotStyle["RobotsTxt_userAgent"]}>
            <div className={robotStyle["RobotsTxt_userAgentTextarea"]}>
              <CodeMirror
                className={robotStyle["RobotsTxt_codemirror"]}
                value={robots.roboTxt}
                height=" calc(100vh - 170px)"
                theme={githubLight}
                extensions={[javascript({ jsx: true })]}
                onChange={(e) => {
                  setRobots({ ...robots, roboTxt: e });
                }}
              />
            </div>

            <div className={robotStyle["RobotsTxt_userAgentButtons"]}>
              <div className={robotStyle["RobotsTxt_userAgentButtonsStyle"]}>
                <button className={robotStyle["RobotsTxt_SaveButton"]}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
