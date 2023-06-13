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
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemIcon,
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
import { isMobile } from "react-device-detect";
import LogoutModal from "./logoutModal";
import { useSelector } from "react-redux";
import { RootState } from "../stores/rootReducer";
import secureLocalStorage from "react-secure-storage";

const drawerWidth = 240;
const logo = require("../assets/images/ksa-logo-purple.png");

interface IDrawer {
  title: string;
  isChild: boolean;
  name: string;
  idPanel: number;
}

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
    color: Colors.primary,
    // borderTopRightRadius: 100,
    // borderBottomRightRadius: 100,
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

const NavigationBarUser = ({ title, isChild, name, idPanel }: IDrawer) => {
  const navigate = useNavigate();
  const PermissionsRedux = useSelector(
    (state: RootState) => state.userPermissions.data
  );
  const [isDrawer, setDrawer] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(null);
  const [isLogout, setLogout] = React.useState(false);

  const [expanded, setExpanded] = React.useState<string | false>(
    `panel${idPanel}`
  );

  const handleClick = (panel: number, isExpand: boolean, nav: string) => {
    setExpanded(isExpand ? `panel${panel}` : false);
    navigate(nav);
    // console.log(nav)
  };

  const LogoutPopup = () => {
    profileClose();
    setLogout(!isLogout);
  };
  const toggleDrawer = () => setDrawer(!isDrawer);
  const profileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfile(event.currentTarget);
  };

  const profileClose = () => {
    setProfile(null);
  };

  const SettingsPage = () => {
    profileClose();
    navigate("/settings/profilku");
  };

  const MenuList = () => {
    let newArr = [];
    for (let i = 0; i < ListUser.length; i++) {
      const ItemI = ListUser[i];
      const filteredArray = ItemI.children.filter((el) => {
        return PermissionsRedux.permissions.some((f: any) => {
          return f.permissionName === el.name;
        });
      });
      if (filteredArray.length > 0) {
        let newObj = ItemI;
        newObj.children = filteredArray;
        newArr.push(newObj);
      }
    }
    PermissionsRedux.permissions.find((e: any) => {
      if (e.permissionName === "AKUN") {
        newArr.unshift({
          id: 5,
          label: "Akun",
          name: "AKUN",
          icon: "description",
          navigate: "/akun",
          expandable: false,
          children: [],
        });
      }
    });
    newArr.unshift(ListUser[0]);
    return newArr;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
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
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              {isMobile ? (
                <Icon
                  sx={{
                    color: Colors.secondary,
                    fontSize: 25,
                    cursor: "pointer",
                  }}
                  onClick={toggleDrawer}
                >
                  menu
                </Icon>
              ) : null}
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
                    padding: isMobile ? "10px 2px" : "10px",
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
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={3}>
              <Badge badgeContent={100} color="secondary">
                <Notifications
                  sx={{ color: Colors.secondary, fontSize: isMobile ? 25 : 30 }}
                />
              </Badge>
              <>
                <IconButton onClick={profileClick}>
                  <Avatar
                    alt={"avatar"}
                    src={
                      "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                    }
                    sx={{
                      width: isMobile ? 30 : 50,
                      height: isMobile ? 30 : 50,
                    }}
                  ></Avatar>
                </IconButton>
                <Menu
                  anchorEl={profile}
                  open={Boolean(profile)}
                  onClose={profileClose}
                >
                  <MenuItem
                    onClick={SettingsPage}
                    sx={{
                      "&:hover": {
                        color: Colors.primary,
                        transition: "all .3s",
                      },
                      transition: "all .3s",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <Icon>settings</Icon>
                    </ListItemIcon>
                    <ListItemText sx={{ color: "inherit" }}>
                      Settings
                    </ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={LogoutPopup}
                    sx={{
                      "&:hover": {
                        color: Colors.primary,
                        transition: "all .3s",
                      },
                      transition: "all .3s",
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <Icon>logout</Icon>
                    </ListItemIcon>
                    <ListItemText sx={{ color: "inherit" }}>
                      Logout
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: isMobile ? "100%" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          scrollbarWidth: "thin",
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? isDrawer : true}
        onClose={toggleDrawer}
      >
        <Toolbar sx={{ ...CENTER }}>
          <img src={logo} style={styles.imgLogo} alt="" />
        </Toolbar>
        <Stack
          direction={"column"}
          gap={0.5}
          style={{ scrollbarWidth: "thin" }}
        >
          {
            MenuList().map((item: any, index: number) => (
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
                      borderTopRightRadius: 100,
                      borderBottomRightRadius: 100,
                      backgroundColor:
                        name === item.label ? Colors.inherit : "#fff",
                      color:
                        name === item.label ? Colors.primary : Colors.secondary,
                      marginTop: index === 0 ? 5 : 0,
                      "&:hover": {
                        backgroundColor: Colors.inherit,
                        color: Colors.primary,
                        borderTopRightRadius: 100,
                        borderBottomRightRadius: 100,
                      },
                      width: "95%",
                    }}
                  >
                    <Icon
                      sx={{
                        color:
                          name === item.label ? Colors.primary : Colors.secondary,
                        ...styles.iconHover,
                      }}
                    >
                      {item.icon}
                    </Icon>
                    <p style={{ fontSize: 14, margin: 0, fontWeight: 500 }}>
                      {item.label}
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
                              name === item.label
                                ? Colors.primary
                                : Colors.secondary,
                            ...styles.iconHover,
                          }}
                        >
                          {item.icon}
                        </Icon>
                        <p style={{ fontSize: 14, margin: 0, fontWeight: 500 }}>
                          {item.label}
                        </p>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ paddingLeft: 0 }}>
                      <Stack direction={"column"} gap={0.5}>
                        {item.children.map((val: any, index: number) => (
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
                              padding: "10px",
                              paddingLeft: "30px",
                              borderTopRightRadius: 100,
                              borderBottomRightRadius: 100,
                              borderLeft:
                                name === val.label
                                  ? `3px solid ${Colors.primary}`
                                  : "none",
                              "&:hover": {
                                backgroundColor: Colors.inherit,
                                color: Colors.primary,
                                borderTopRightRadius: 100,
                                borderBottomRightRadius: 100,
                              },
                              backgroundColor:
                                name === val.label ? Colors.inherit : "#fff",
                              color:
                                name === val.label
                                  ? Colors.primary
                                  : Colors.secondary,
                            }}
                          >
                            <Icon sx={{ ...styles.iconHover }}>{val.icon}</Icon>
                            <p
                              style={{ fontSize: 13, margin: 0, fontWeight: 500 }}
                            >
                              {val.label}
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
      <LogoutModal
        isOpen={isLogout}
        setOpen={LogoutPopup}
        navigate={navigate}
      />
    </Box>
  );
};

const styles: StyleSheet = {
  title: {
    fontWeight: "700",
    color: Colors.primary,
    fontSize: isMobile ? 16 : 20,
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
    // borderTopRightRadius: 100,
    // borderBottomRightRadius: 100,
    width: "95%",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};

export default NavigationBarUser;
