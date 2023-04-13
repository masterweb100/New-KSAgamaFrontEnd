import { Box, Stack, Toolbar } from "@mui/material";
import React from "react";
import NavigationBar from "../../../components/appBar";
import { Store } from "@mui/icons-material/";
import "./style.css";
import { isMobile } from 'react-device-detect';

const Dashboard = () => {
  const [storeActive, setStoreActive] = React.useState<any>(null);

  return (
    <div style={{ display: "flex" }}>
      <NavigationBar
        title={"Dashboard"}
        indexNav={0}
        isChild={false}
      ></NavigationBar>
      <Box component="main" sx={{ bgcolor: "#f4f5ff", p: isMobile ? 2 : 5 }}>
        <Toolbar />
        <Stack direction={"column"} gap={3}>
          {[...Array(20)].map((item, index) => (
            <div
              className={"box"}
              onMouseEnter={() => setStoreActive(index)}
              key={index}
              onMouseLeave={() => setStoreActive(null)}
            >
              <Stack direction={"row"} gap={2}>
                <Store
                  sx={{
                    color: storeActive === index ? "#c42401" : "#909090",
                    fontSize: 30,
                    transition: "all 0.2s",
                  }}
                ></Store>
                <Stack direction={"column"} gap={1}>
                  <h3 style={{ margin: 0 }}>Data Statistik Toko A</h3>
                  <p style={{ margin: 0 }}>
                    Nostrud cillum amet nisi anim eu quis duis anim ex enim sunt
                    laboris commodo. Officia duis cupidatat consectetur deserunt
                    quis proident dolor nulla ex magna. Dolor dolore ad ea magna
                    ipsum aliqua nostrud tempor ullamco excepteur incididunt
                    non.
                  </p>
                </Stack>
              </Stack>
            </div>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default Dashboard;
