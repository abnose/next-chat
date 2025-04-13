"use client";
import React from "react";
import { ConfigProvider } from "antd";
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#31304d",
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 45,
              boxShadow: "none",
              colorPrimaryHover: "#31304d",
              controlOutline: "none",
              colorBorder: "#31304d",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  );
};

export default ThemeProvider;
