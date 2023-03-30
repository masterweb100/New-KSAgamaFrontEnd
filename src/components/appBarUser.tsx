import * as React from "react";
import {
  Box,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Stack,
  Avatar,
  Badge,
} from "@mui/material/";
import {
  Notifications,
  ChevronLeftRounded,
  ArrowForwardIosSharp,
} from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Colors } from "../utils/colors";
import { CENTER, StyleSheet } from "../utils/stylesheet";
import { ListUser } from "./data";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";

const drawerWidth = 240;
const logo = require("../assets/images/ksa-logo-purple.png");

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  fontWeight: 500,
  width: "95%",
  color: Colors.secondary,
  "&:before": {
    display: "none",
  },
  "& .Mui-expanded": {
    backgroundColor: Colors.inherit,
    color: Colors.primary,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  transition: "all 0.5s",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: "3px 5px",
  },
  "&:hover": {
    transition: "all 0.5s",
    backgroundColor: Colors.inherit,
    color: Colors.primary,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: 20,
  margin: 0,
}));

const NavigationBarUser = ({
  title,
  isChild,
  name,
  idPanel,
}: {
  title: string;
  isChild: boolean;
  name: string;
  idPanel: number;
}) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState<string | false>(
    `panel${idPanel}`
  );
  const [panel, setPanel] = React.useState(0);

  const handleClick = (panel: number, isExpand: boolean, nav: string) => {
    setPanel(panel);
    setExpanded(isExpand ? `panel${panel}` : false);
    navigate(nav);
    // console.log(nav)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#fff",
        }}
      >
        <Toolbar>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {isChild ? (
              <Stack
                onClick={() => navigate(-1)}
                sx={{
                  "&:hover": {
                    backgroundColor: Colors.inherit,
                    borderRadius: 2,
                    transition: "all 0.3s",
                    cursor: "pointer",
                  },
                  borderRadius: 2,
                  padding: "10px",
                  transition: "all 0.3s",
                }}
                alignItems={"center"}
                gap={1}
                direction={"row"}
              >
                <ChevronLeftRounded
                  style={{ color: Colors.secondary, fontSize: 30 }}
                ></ChevronLeftRounded>
                <p style={styles.title}>{title}</p>
              </Stack>
            ) : (
              <p style={styles.title}>{title}</p>
            )}
            <Stack direction={"row"} alignItems={"center"} gap={5}>
              <Badge badgeContent={100} color="secondary">
                <Notifications sx={{ color: Colors.secondary, fontSize: 30 }} />
              </Badge>
              <Avatar
                alt={"avatar"}
                src={
                  "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                }
                sx={{ width: 50, height: 50 }}
              ></Avatar>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ ...CENTER }}>
          <img src={logo} style={styles.imgLogo} alt="" />
        </Toolbar>
        <Stack direction={"column"} gap={0.5}>
          {ListUser.map((item, index) => (
            <>
              {item.expandable === false ? (
                <Stack
                  key={index}
                  onClick={() =>
                    handleClick(item.id, item.expandable, item.navigate)
                  }
                  direction={"row"}
                  alignItems={"center"}
                  gap={1}
                  sx={{
                    ...styles.tab,
                    padding: "15px 20px",
                    backgroundColor:
                      name === item.name ? Colors.inherit : "#fff",
                    color:
                      name === item.name ? Colors.primary : Colors.secondary,
                    marginTop: index === 0 ? 5 : 0,
                    "&:hover": {
                      backgroundColor: Colors.inherit,
                      color: Colors.primary,
                    },
                    width: "95%",
                  }}
                >
                  <Icon
                    sx={{
                      color:
                        name === item.name ? Colors.primary : Colors.secondary,
                      ...styles.iconHover,
                    }}
                  >
                    {item.icon}
                  </Icon>
                  <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>
                    {item.name}
                  </p>
                </Stack>
              ) : (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${item.id}`}
                >
                  <AccordionSummary
                    onClick={() => handleClick(item.id, item.expandable, "")}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <Icon
                        sx={{
                          color:
                            name === item.name
                              ? Colors.primary
                              : Colors.secondary,
                          ...styles.iconHover,
                        }}
                      >
                        {item.icon}
                      </Icon>
                      <p style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>
                        {item.name}
                      </p>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingLeft: 0 }}>
                    <Stack direction={"column"} gap={0.5}>
                      {item.children.map((val, index) => (
                        <Stack
                          key={index}
                          direction={"row"}
                          alignItems={"center"}
                          gap={1}
                          onClick={() =>
                            handleClick(item.id, item.expandable, val.navigate)
                          }
                          sx={{
                            ...styles.tab,
                            padding: "15px",
                            paddingLeft: "50px",
                            "&:hover": {
                              backgroundColor: Colors.inherit,
                              color: Colors.primary,
                            },
                            backgroundColor:
                              name === val.name ? Colors.inherit : "#fff",
                            color:
                              name === val.name
                                ? Colors.primary
                                : Colors.secondary,
                          }}
                        >
                          <Icon sx={{ ...styles.iconHover }}>{val.icon}</Icon>
                          <p
                            style={{ fontSize: 14, margin: 0, fontWeight: 600 }}
                          >
                            {val.name}
                          </p>
                        </Stack>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              )}
            </>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
};

const styles: StyleSheet = {
  title: {
    fontWeight: "700",
    color: Colors.primary,
    fontSize: 20,
    margin: 0,
  },

  iconHover: {
    fontSize: 20,
    color: "inherit",
  },

  imgLogo: {
    height: "auto",
    width: "90%",
    objectFit: "contain",
  },

  tab: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    width: "95%",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default NavigationBarUser;
