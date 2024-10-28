import React from "react";
import autoAnimate from "@formkit/auto-animate";
type Props = {
     children?: React.ReactNode;
     style?: React.CSSProperties;
};

export const TransitionGroup: React.FC<Props> = React.memo(({ children, style }) => {
     const parent = React.useRef(null);

     React.useEffect(() => {
          parent.current && autoAnimate(parent.current);
     }, [parent]);

     return (
          <div style={style} ref={parent}>
               {children}
          </div>
     );
});
