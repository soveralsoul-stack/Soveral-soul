import React from "react";
import { Stage } from "../Stage";
import { AnimatedText } from "../AnimatedText";
import { colors, fonts, type } from "../../brand/tokens";

export const Statement: React.FC<{ quote: string; attribution: string }> = ({
  quote,
  attribution,
}) => {
  return (
    <Stage>
      <div style={{ textAlign: "center", width: "80%" }}>
        <AnimatedText>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: type.title,
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.25,
              color: colors.cream,
            }}
          >
            “{quote}”
          </div>
        </AnimatedText>
        <AnimatedText delay={20}>
          <div
            style={{
              marginTop: 36,
              fontFamily: fonts.body,
              fontSize: type.body,
              letterSpacing: 2,
              color: colors.goldSoft,
            }}
          >
            {attribution}
          </div>
        </AnimatedText>
      </div>
    </Stage>
  );
};
