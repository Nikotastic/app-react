import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import styles from "../../theme/Auth/styles";

const { width } = Dimensions.get("window");

export default function SvgWave() {
  return (
    <View style={styles.topRightWave}>
      {/* Dibuja una curva SVG como fondo decorativo */}
      <Svg width={width} height={200} viewBox={`0 0 ${width} 200`}>
        <Path
          d={`M${width},0 L${width},150 Q${width - 100},100 ${width - 200},140 Q${width - 300},180 ${width - 400},120 Q${width - 500},60 ${width - 600},100 L0,0 Z`}
          fill="#b3e5fc"
        />
      </Svg>
    </View>
  );
}
