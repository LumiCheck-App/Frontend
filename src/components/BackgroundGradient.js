import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function BackgroundGradient({ children }) {

    return (
        <LinearGradient
            colors={["#ffe5b4", "#fff9ef", "#fff9ef"]}
            locations={[0, 0.5, 1]}
            style={{ flex: 1 }}
        >
            {children}
        </LinearGradient>
    );
}
