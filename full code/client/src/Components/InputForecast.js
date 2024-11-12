import React from "react";
import { Button } from "@mui/material";
import parse from "paste-from-excel";
import { API_URL } from "../config";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { ThemeProvider } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

class InputForcast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(JSON.stringify(this.props.data)),
      isNotValid: [],
      arr: [],
      pageIndex: 0,
      pageSubIndex: 0,
      open: false,
      modalText: "",
      loading: false,
    };
    // console.log(JSON.stringify((this.props.data)));
  }

  componentDidMount() {
    if (this.props.isEditable) {
      this.setState({ arr: JSON.parse(JSON.stringify(this.props.data)) });
      // console.log(this.props.data)
    }
  }
  

  handleChangeSplitTOC2 = (e, obj) => {
    e.persist();
    let [
      countryName,
      i,
      tocindex,
      toc_index,
      toc2_index,
      toc_name,
      splitType,
      type,
    ] = obj;
    let splitIndex;
    if (splitType == "startSplit") {
      splitIndex = 0;
    } else if (splitType == "endSplit") {
      splitIndex = 1;
    }
    let data = [...this.state.data];
    if (type == "value") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index][
            "toc_component"
          ] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["split"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["split"][splitIndex] = e.target.value;
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index][
            "toc_component"
          ] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["split"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["split"][splitIndex] = "";
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      }
    } else if (type == "volume") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index][
            "toc_component"
          ] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["vsplit"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["vsplit"][splitIndex] = e.target.value;
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index][
            "toc_component"
          ] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["vsplit"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["vsplit"][splitIndex] = "";
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      }
    }
  };

  handleChangeSplitTOC3 = (e, obj) => {
    e.persist();
    let [
      countryName,
      i,
      tocindex,
      toc_index,
      toc2_index,
      toc3_index,
      toc_name,
      splitType,
      type,
    ] = obj;
    let splitIndex;
    if (splitType == "startSplit") {
      splitIndex = 0;
    } else if (splitType == "endSplit") {
      splitIndex = 1;
    }
    let data = [...this.state.data];
    if (type == "value") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["split"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["split"][splitIndex] =
              e.target.value;
          }
        }

        this.setState({ arr: data });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["split"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["split"][splitIndex] = "";
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      }
    } else if (type == "volume") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["vsplit"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["vsplit"][splitIndex] =
              e.target.value;
          }
        }

        this.setState({ arr: data });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_name"] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["vsplit"]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["vsplit"][splitIndex] = "";
          }
        }

        this.setState({ arr: data }, () => {
          console.log(this.state.data);
        });
      }
    }
  };

  handleChangeSplitTOC4 = (e, obj) => {
    e.persist();
    let [
      countryName,
      i,
      tocindex,
      toc_index,
      toc2_index,
      toc3_index,
      toc4_index,
      toc_name,
      splitType,
      type,
    ] = obj;
    let splitIndex;
    if (splitType == "startSplit") {
      splitIndex = 0;
    } else if (splitType == "endSplit") {
      splitIndex = 1;
    }
    let data = [...this.state.data];
    if (type == "value") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"][toc3_index]["toc3_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "toc4_name"
            ] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "split"
            ]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "split"
            ][splitIndex] = e.target.value;
          }
        }

        this.setState({ arr: data });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"][toc3_index]["toc3_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "toc4_name"
            ] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "split"
            ]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "split"
            ][splitIndex] = "";
          }
        }

        this.setState({ arr: data });
      }
    } else if (type == "volume") {
      if (parseFloat(e.target.value.split("%")[0]) <= 100) {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"][toc3_index]["toc3_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "toc4_name"
            ] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "vsplit"
            ]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "vsplit"
            ][splitIndex] = e.target.value;
          }
        }

        this.setState({ arr: data });
      } else if (e.target.value == "") {
        if (
          data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
            toc2_index
          ]["toc2_component"][toc3_index]["toc3_component"] instanceof Array &&
          data[i]["tocreg"][tocindex]["country"].toLowerCase() ==
            countryName.toLowerCase()
        ) {
          if (
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "toc4_name"
            ] === toc_name &&
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "vsplit"
            ]
          ) {
            data[i]["tocreg"][tocindex]["toc"][toc_index]["toc_component"][
              toc2_index
            ]["toc2_component"][toc3_index]["toc3_component"][toc4_index][
              "vsplit"
            ][splitIndex] = "";
          }
        }

        this.setState({ arr: data });
      }
    }
  };

  handlePaste = (e) => {
    return parse(e);
  };

  handleSubmit = (regionIn, regionIndex) => {
    let tempArr = [...this.state.arr][regionIn]["tocreg"][
      this.state.pageSubIndex
    ]["toc"];
    var body = [];
    for (let index = 0; index < tempArr.length; index++) {
      var startSplit;
      var endSplit;
      var VstartSplit;
      var VendSplit;
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          if (this.props.reportData.value) {
            startSplit = tempArr[index]["toc_component"][j]["split"][0];
            endSplit = tempArr[index]["toc_component"][j]["split"][1];
          }
          if (this.props.reportData.volume) {
            VstartSplit = tempArr[index]["toc_component"][j]["vsplit"][0];
            VendSplit = tempArr[index]["toc_component"][j]["vsplit"][1];
          }

          if (this.props.reportData.value && this.props.reportData.volume) {
            body[index] = {
              id: index + 1,
              noc: this.state.arr[regionIn]["tocreg"].length - 1,
              startSplit:
                body[index] && body[index].startSplit
                  ? {
                      ...body[index].startSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        startSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        startSplit,
                    },
              endSplit:
                body[index] && body[index].endSplit
                  ? {
                      ...body[index].endSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        endSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        endSplit,
                    },
              VstartSplit: this.props.reportData.volume
                ? body[index] && body[index].VstartSplit
                  ? {
                      ...body[index].VstartSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VstartSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VstartSplit,
                    }
                : [],
              VendSplit: this.props.reportData.volume
                ? body[index] && body[index].VendSplit
                  ? {
                      ...body[index].VendSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VendSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VendSplit,
                    }
                : [],
            };
          } else if (
            this.props.reportData.value &&
            !this.props.reportData.volume
          ) {
            body[index] = {
              id: index + 1,
              noc: this.state.arr[regionIn]["tocreg"].length - 1,
              startSplit:
                body[index] && body[index].startSplit
                  ? {
                      ...body[index].startSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        startSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        startSplit,
                    },
              endSplit:
                body[index] && body[index].endSplit
                  ? {
                      ...body[index].endSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        endSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        endSplit,
                    },
            };
          } else if (
            !this.props.reportData.value &&
            this.props.reportData.volume
          ) {
            body[index] = {
              id: index + 1,
              noc: this.state.arr[regionIn]["tocreg"].length - 1,
              VstartSplit: this.props.reportData.volume
                ? body[index] && body[index].VstartSplit
                  ? {
                      ...body[index].VstartSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VstartSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VstartSplit,
                    }
                : [],
              VendSplit: this.props.reportData.volume
                ? body[index] && body[index].VendSplit
                  ? {
                      ...body[index].VendSplit,
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VendSplit,
                    }
                  : {
                      [tempArr[index]["toc_component"][j]["toc2_name"]]:
                        VendSplit,
                    }
                : [],
            };
          }
        }
      }
    }
    for (let index = 0; index < tempArr.length; index++) {
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          var startSplit;
          var endSplit;
          var VstartSplit;
          var VendSplit;
          if (tempArr[index]["toc_component"][j]["toc2_component"].length > 0) {
            var tmpAr = [{}];
            for (
              let k = 0;
              k < tempArr[index]["toc_component"][j]["toc2_component"].length;
              k++
            ) {
              if (this.props.reportData.value) {
                startSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "split"
                  ][0];
                endSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "split"
                  ][1];
              }
              if (this.props.reportData.volume) {
                VstartSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "vsplit"
                  ][0];
                VendSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "vsplit"
                  ][1];
              }
              if (this.props.reportData.value && this.props.reportData.volume) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[regionIn]["tocreg"].length - 1,
                    startSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].startSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].startSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          },
                    endSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].endSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].endSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          },
                    VstartSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VstartSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VstartSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          },
                    VendSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VendSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VendSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          },
                  },
                ];
              } else if (
                this.props.reportData.value &&
                !this.props.reportData.volume
              ) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[regionIn]["tocreg"].length - 1,
                    startSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].startSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].startSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          },
                    endSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].endSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].endSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          },
                  },
                ];
              } else if (
                !this.props.reportData.value &&
                this.props.reportData.volume
              ) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[regionIn]["tocreg"].length - 1,
                    VstartSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VstartSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VstartSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          },
                    VendSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VendSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VendSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          },
                  },
                ];
              }
            }
            body[body.length] = tmpAr[0];
          }
        }
      }
    }
    for (let index = 0; index < tempArr.length; index++) {
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          if (tempArr[index]["toc_component"][j]["toc2_component"].length > 0) {
            for (
              let k = 0;
              k < tempArr[index]["toc_component"][j]["toc2_component"].length;
              k++
            ) {
              var startSplit;
              var endSplit;
              var VstartSplit;
              var VendSplit;
              if (
                tempArr[index]["toc_component"][j]["toc2_component"][k][
                  "toc3_component"
                ].length > 0
              ) {
                var tmpAr = [{}];
                for (
                  let l = 0;
                  l <
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "toc3_component"
                  ].length;
                  l++
                ) {
                  if (this.props.reportData.value) {
                    startSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["split"][0];

                    endSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["split"][1];
                  }
                  if (this.props.reportData.volume) {
                    VstartSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["vsplit"][0];

                    VendSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["vsplit"][1];
                  }
                  if (
                    this.props.reportData.value &&
                    this.props.reportData.volume
                  ) {
                    tmpAr = [
                      {
                        id: body.length + 1,
                        noc: this.state.arr[regionIn]["tocreg"].length - 1,
                        startSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].startSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].startSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  startSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  startSplit,
                              },
                        endSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].endSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].endSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  endSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  endSplit,
                              },
                        VstartSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].VstartSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].VstartSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VstartSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VstartSplit,
                              },
                        VendSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].VendSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].VendSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VendSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VendSplit,
                              },
                      },
                    ];
                  } else if (
                    this.props.reportData.value &&
                    !this.props.reportData.volume
                  ) {
                    tmpAr = [
                      {
                        id: body.length + 1,
                        noc: this.state.arr[regionIn]["tocreg"].length - 1,
                        startSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].startSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].startSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  startSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  startSplit,
                              },
                        endSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].endSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].endSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  endSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  endSplit,
                              },
                      },
                    ];
                  } else if (
                    !this.props.reportData.value &&
                    this.props.reportData.volume
                  ) {
                    tmpAr = [
                      {
                        id: body.length + 1,
                        noc: this.state.arr[regionIn]["tocreg"].length - 1,
                        VstartSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].VstartSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].VstartSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VstartSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VstartSplit,
                              },
                        VendSplit:
                          tmpAr[tmpAr.length - 1] &&
                          tmpAr[tmpAr.length - 1].VendSplit
                            ? {
                                ...tmpAr[tmpAr.length - 1].VendSplit,
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VendSplit,
                              }
                            : {
                                [tempArr[index]["toc_component"][j][
                                  "toc2_component"
                                ][k]["toc3_component"][l]["toc4_name"]]:
                                  VendSplit,
                              },
                      },
                    ];
                  }
                }
                body[body.length] = tmpAr[0];
              }
            }
          }
        }
      }
    }

    let valid = false;
    for (let index = 0; index < body.length; index++) {
      let totalStart = 0;
      let totalEnd = 0;
      let VtotalStart = 0;
      let VtotalEnd = 0;
      if (this.props.reportData.value) {
        totalStart = Object.values(body[index]["startSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        totalEnd = Object.values(body[index]["endSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        totalStart = this.roundToTwo(totalStart);
        totalEnd = this.roundToTwo(totalEnd);
      }
      if (this.props.reportData.volume) {
        VtotalStart = Object.values(body[index]["VstartSplit"]).reduce(
          (a, b) => {
            return (
              this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
            );
          },
          0
        );
        VtotalEnd = Object.values(body[index]["VendSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        VtotalStart = this.roundToTwo(VtotalStart);
        VtotalEnd = this.roundToTwo(VtotalEnd);
      }

      if (
        this.props.reportData.value &&
        totalStart <= 100.1 &&
        totalStart >= 99.9 &&
        totalEnd <= 100.1 &&
        totalEnd >= 99.9
      )
        valid = true;
      else if (this.props.reportData.value) valid = false;
      totalStart = 0;
      totalEnd = 0;

      if (
        this.props.reportData.volume &&
        VtotalStart <= 100.1 &&
        VtotalStart >= 99.9 &&
        VtotalEnd <= 100.1 &&
        VtotalEnd >= 99.9
      )
        valid = true;
      else if (this.props.reportData.volume) valid = false;
      VtotalStart = 0;
      VtotalEnd = 0;
      if (!valid) {
        break;
      }
    }
    if (valid) {
      if (this.state.data.length - 1 != regionIn) {
        this.setState({ pageSubIndex: this.state.pageSubIndex + 1 }, () => {
          if (regionIndex == this.state.pageSubIndex)
            this.setState({
              pageSubIndex: 0,
              pageIndex: this.state.pageIndex + 1,
            });
        });
        return;
      }
      this.setState({ data: [], loading: true });
      let body;

      let geography = this.props?.reportData?.geography;
      if (geography == "Regional") {
        body = {
          ...this.props?.reportData,
          toc: this.state.arr[0]["tocreg"],
        };
      } else if (geography == "Country") {
        body = {
          ...this.props?.reportData,
          toc: this.state.arr[0]["tocreg"][0]["toc"],
        };
      } else {
        body = {
          ...this.props?.reportData,
          toc: this.state.arr,
        };
      }
      document.getElementsByClassName("back2Country")[0].style.display = 'none';
      document.getElementsByClassName("back2Country")[1].style.display = 'none';
      axios
        .post(`${API_URL}/reportgen/data/`, body, {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          // setCountryList(res.data.data);
          this.setState({
            loading: false,
            open: true,
            modalText:
              "Report generated successfully please check in reports section",
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            open: true,
            modalText: "Something went wrong please try again",
          });
        });
      console.log(this.props);
      console.log(body);
    } else
      ToastsStore.warning(
        "Please enter correct data start and end split total must be 100"
      );
  };

  handleNext = (regionIndex, i) => {
    let tempArr = [...this.state.arr][i]["tocreg"][this.state.pageSubIndex][
      "toc"
    ];
    var body = [];
    for (let index = 0; index < tempArr.length; index++) {
      var startSplit;
      var endSplit;
      var VstartSplit;
      var VendSplit;
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          if (this.props.reportData.value) {
            startSplit = tempArr[index]["toc_component"][j]["split"][0];
            endSplit = tempArr[index]["toc_component"][j]["split"][1];
          }
          if (this.props.reportData.volume) {
            VstartSplit = tempArr[index]["toc_component"][j]["vsplit"][0];
            VendSplit = tempArr[index]["toc_component"][j]["vsplit"][1];
          }

          body[index] = {
            id: index + 1,
            noc: this.state.arr[i]["tocreg"].length - 1,
            startSplit: this.props.reportData.value
              ? body[index] && body[index].startSplit
                ? {
                    ...body[index].startSplit,
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      startSplit,
                  }
                : {
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      startSplit,
                  }
              : [],
            endSplit: this.props.reportData.value
              ? body[index] && body[index].endSplit
                ? {
                    ...body[index].endSplit,
                    [tempArr[index]["toc_component"][j]["toc2_name"]]: endSplit,
                  }
                : {
                    [tempArr[index]["toc_component"][j]["toc2_name"]]: endSplit,
                  }
              : [],
            VstartSplit: this.props.reportData.volume
              ? body[index] && body[index].VstartSplit
                ? {
                    ...body[index].VstartSplit,
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      VstartSplit,
                  }
                : {
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      VstartSplit,
                  }
              : [],
            VendSplit: this.props.reportData.volume
              ? body[index] && body[index].VendSplit
                ? {
                    ...body[index].VendSplit,
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      VendSplit,
                  }
                : {
                    [tempArr[index]["toc_component"][j]["toc2_name"]]:
                      VendSplit,
                  }
              : [],
          };
        }
      }
    }
    for (let index = 0; index < tempArr.length; index++) {
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          var startSplit;
          var endSplit;
          var VstartSplit;
          var VendSplit;
          if (tempArr[index]["toc_component"][j]["toc2_component"].length > 0) {
            var tmpAr = [{}];
            for (
              let k = 0;
              k < tempArr[index]["toc_component"][j]["toc2_component"].length;
              k++
            ) {
              if (this.props.reportData.value) {
                startSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "split"
                  ][0];
                endSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "split"
                  ][1];
              }
              if (this.props.reportData.volume) {
                VstartSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "vsplit"
                  ][0];
                VendSplit =
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "vsplit"
                  ][1];
              }
              if (this.props.reportData.value && this.props.reportData.volume) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[i]["tocreg"].length - 1,
                    startSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].startSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].startSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          },
                    endSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].endSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].endSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          },
                    VstartSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VstartSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VstartSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          },
                    VendSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VendSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VendSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          },
                  },
                ];
              } else if (
                this.props.reportData.value &&
                !this.props.reportData.volume
              ) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[i]["tocreg"].length - 1,
                    startSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].startSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].startSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: startSplit,
                          },
                    endSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].endSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].endSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: endSplit,
                          },
                  },
                ];
              } else if (
                !this.props.reportData.value &&
                this.props.reportData.volume
              ) {
                tmpAr = [
                  {
                    id: body.length + 1,
                    noc: this.state.arr[i]["tocreg"].length - 1,
                    VstartSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VstartSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VstartSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VstartSplit,
                          },
                    VendSplit:
                      tmpAr[tmpAr.length - 1] &&
                      tmpAr[tmpAr.length - 1].VendSplit
                        ? {
                            ...tmpAr[tmpAr.length - 1].VendSplit,
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          }
                        : {
                            [tempArr[index]["toc_component"][j][
                              "toc2_component"
                            ][k]["toc3_name"]]: VendSplit,
                          },
                  },
                ];
              }
            }
            body[body.length] = tmpAr[0];
          }
        }
      }
    }
    for (let index = 0; index < tempArr.length; index++) {
      if (tempArr[index]["toc_component"].length > 0) {
        for (let j = 0; j < tempArr[index]["toc_component"].length; j++) {
          if (tempArr[index]["toc_component"][j]["toc2_component"].length > 0) {
            for (
              let k = 0;
              k < tempArr[index]["toc_component"][j]["toc2_component"].length;
              k++
            ) {
              var startSplit;
              var endSplit;
              var VstartSplit;
              var VendSplit;
              if (
                tempArr[index]["toc_component"][j]["toc2_component"][k][
                  "toc3_component"
                ].length > 0
              ) {
                var tmpAr = [{}];
                for (
                  let l = 0;
                  l <
                  tempArr[index]["toc_component"][j]["toc2_component"][k][
                    "toc3_component"
                  ].length;
                  l++
                ) {
                  if (this.props.reportData.value) {
                    startSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["split"][0];

                    endSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["split"][1];
                  }
                  if (this.props.reportData.volume) {
                    VstartSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["vsplit"][0];

                    VendSplit =
                      tempArr[index]["toc_component"][j]["toc2_component"][k][
                        "toc3_component"
                      ][l]["vsplit"][1];
                  }

                  tmpAr = [
                    {
                      id: body.length + 1,
                      noc: this.state.arr[i]["tocreg"].length - 1,
                      startSplit:
                        tmpAr[tmpAr.length - 1] &&
                        tmpAr[tmpAr.length - 1].startSplit
                          ? {
                              ...tmpAr[tmpAr.length - 1].startSplit,
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                startSplit,
                            }
                          : {
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                startSplit,
                            },
                      endSplit:
                        tmpAr[tmpAr.length - 1] &&
                        tmpAr[tmpAr.length - 1].endSplit
                          ? {
                              ...tmpAr[tmpAr.length - 1].endSplit,
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]: endSplit,
                            }
                          : {
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]: endSplit,
                            },

                      VstartSplit:
                        tmpAr[tmpAr.length - 1] &&
                        tmpAr[tmpAr.length - 1].VstartSplit
                          ? {
                              ...tmpAr[tmpAr.length - 1].VstartSplit,
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                VstartSplit,
                            }
                          : {
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                VstartSplit,
                            },
                      VendSplit:
                        tmpAr[tmpAr.length - 1] &&
                        tmpAr[tmpAr.length - 1].VendSplit
                          ? {
                              ...tmpAr[tmpAr.length - 1].VendSplit,
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                VendSplit,
                            }
                          : {
                              [tempArr[index]["toc_component"][j][
                                "toc2_component"
                              ][k]["toc3_component"][l]["toc4_name"]]:
                                VendSplit,
                            },
                    },
                  ];
                }
                body[body.length] = tmpAr[0];
              }
            }
          }
        }
      }
    }

    let valid = false;
    for (let index = 0; index < body.length; index++) {
      let totalStart = 0;
      let totalEnd = 0;
      let VtotalStart = 0;
      let VtotalEnd = 0;
      if (this.props.reportData.value) {
        totalStart = Object.values(body[index]["startSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        totalEnd = Object.values(body[index]["endSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        totalStart = this.roundToTwo(totalStart);
        totalEnd = this.roundToTwo(totalEnd);
      }
      if (this.props.reportData.volume) {
        VtotalStart = Object.values(body[index]["VstartSplit"]).reduce(
          (a, b) => {
            return (
              this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
            );
          },
          0
        );
        VtotalEnd = Object.values(body[index]["VendSplit"]).reduce((a, b) => {
          return (
            this.roundToTwo(parseFloat(a)) + this.roundToTwo(parseFloat(b))
          );
        }, 0);
        VtotalStart = this.roundToTwo(VtotalStart);
        VtotalEnd = this.roundToTwo(VtotalEnd);
      }

      if (
        this.props.reportData.value &&
        totalStart <= 100.1 &&
        totalStart >= 99.9 &&
        totalEnd <= 100.1 &&
        totalEnd >= 99.9
      )
        valid = true;
      else if (this.props.reportData.value) {
        valid = false;
      }
      totalStart = 0;
      totalEnd = 0;

      if (
        this.props.reportData.volume &&
        VtotalStart <= 100.1 &&
        VtotalStart >= 99.9 &&
        VtotalEnd <= 100.1 &&
        VtotalEnd >= 99.9
      )
        valid = true;
      else if (this.props.reportData.volume) valid = false;

      VtotalStart = 0;
      VtotalEnd = 0;
      if (!valid) {
        break;
      }
    }

    if (valid) {
      this.setState({ pageSubIndex: this.state.pageSubIndex + 1 }, () => {
        if (regionIndex == this.state.pageSubIndex)
          this.setState({
            pageSubIndex: 0,
            pageIndex: this.state.pageIndex + 1,
          });
      });
    } else
      ToastsStore.warning(
        "Please enter correct data start and end split total must be 100"
      );

    window.scrollTo(0, 0);
  };
  handlePrevious = (regionIndex) => {
    this.setState({ pageSubIndex: this.state.pageSubIndex - 1 }, () => {
      if (regionIndex == this.state.pageSubIndex)
        this.setState({ pageSubIndex: 0, pageIndex: this.state.pageIndex - 1 });
    });
    window.scrollTo(0, 0);
  };

  handleCreateVariation = (ind, arr) => {
    let variationData;
    if (
      this.state.arr &&
      this.state.arr[ind] &&
      this.state.arr[ind]["tocreg"] &&
      this.state.arr[ind]["tocreg"][0] &&
      this.state.arr[ind]["tocreg"][0]["toc"]
    ) {
      let tempArr = [
        ...this.state.arr[ind]["tocreg"][this.state.pageSubIndex]["toc"],
      ];

      var body = {
        value: this.props.reportData.value,
        volume: this.props.reportData.volume,
        toc: tempArr,
        noc: this.state.arr[ind]["tocreg"].length - 1,
      };
      axios
        .post(`${API_URL}/api/autogenerate/`, body, {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          variationData = [...res.data];
        })
        .then((res) => {
          for (
            let index = 0;
            index < this.state.arr[ind]["tocreg"].length - 1;
            index++
          ) {
            this.state.arr[ind]["tocreg"][index + 1]["toc"] =
              variationData[index];
          }
          ToastsStore.success("Variation created successfully");
        });
    }
  };
  roundToTwo = (num) => {
    return num ? +(Math.round(num + "e+2") + "e-2") : "";
  };

  render() {
    return (
      <React.Fragment>
        {this.state.data &&
          this.state.data.map(
            (data, i) =>
              this.state.pageIndex == i && (
                <React.Fragment>
                      {this.state.pageSubIndex <= data.tocreg.length && (
                              <React.Fragment>
                                <Button
                                  variant="contained"
                                  style={{ margin: "10px" }}
                                  onClick={() => {
                                    if (
                                      this.state.pageSubIndex ==
                                      data.tocreg.length - 1
                                    )
                                      this.handleSubmit(i, data.tocreg.length);
                                    else this.handleNext(data.tocreg.length, i);
                                  }}
                                >
                                  {this.state.pageSubIndex ==
                                  data.tocreg.length - 1
                                    ? "Submit"
                                    : "Next"}
                                </Button>
                                {this.state.pageSubIndex == 0 &&
                                  this.props.reportData.geography !=
                                    "Country" && (
                                    <Button
                                      variant="contained"
                                      style={{ margin: "10px" }}
                                      onClick={() => {
                                        this.handleCreateVariation(i);
                                      }}
                                    >
                                      Create Variation
                                    </Button>
                                  )}
                              </React.Fragment>
                            )}

                            {this.state.pageSubIndex > 0 && (
                              <Button
                                style={{ margin: "10px" }}
                                variant="contained"
                                onClick={() =>
                                  this.handlePrevious(data.tocreg.length)
                                }
                              >
                                Back
                              </Button>
                            )}
                  <h2>{data.region}</h2>
                  {data &&
                    data.tocreg.length > 0 &&
                    data.tocreg &&
                    data.tocreg.map(
                      (tocreg, tocindex) =>
                        this.state.pageSubIndex == tocindex && (
                          <React.Fragment>
                            <table
                              className="table table-bordered"
                              style={{ maxWidth: "70rem", margin: "auto" }}
                              key={tocindex}
                            >
                              <React.Fragment>
                                <thead>
                                  <tr>
                                    <th>Country</th>
                                    <th
                                      colSpan={
                                        this.props.reportData.value &&
                                        this.props.reportData.volume
                                          ? 4
                                          : 2
                                      }
                                    >
                                      {tocreg.country}
                                    </th>
                                  </tr>
                                  <tr
                                    style={{
                                      color: "black",
                                      backgroundColor: "#b8b8b8",
                                    }}
                                  >
                                    <th>TOC</th>
                                    {this.props.reportData.value && (
                                      <>
                                        <th>Start Split(Value)</th>
                                        <th>End Split(Value)</th>
                                      </>
                                    )}

                                    {this.props.reportData.volume &&
                                      !this.props.reportData.value && (
                                        <>
                                          <th>Start Split(Volume)</th>
                                          <th>End Split(Volume)</th>
                                        </>
                                      )}
                                    {this.props.reportData.value &&
                                      this.props.reportData.volume && (
                                        <>
                                          <th>Start Split(Volume)</th>
                                          <th>End Split(Volume)</th>
                                        </>
                                      )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {tocreg["toc"] &&
                                    tocreg["toc"].length > 0 &&
                                    tocreg["toc"].map((item, toc_index) => {
                                      let totalStart = 0;
                                      let totalEnd = 0;
                                      let totalVStart = 0;
                                      let totalVEnd = 0;
                                      return (
                                        <React.Fragment>
                                          <tr
                                            key={toc_index}
                                            style={{
                                              color: "black",
                                              backgroundColor: "#b8b8b8",
                                            }}
                                          >
                                            <td>
                                              {item["toc_name"]} (Level 1)
                                            </td>
                                            <td></td>
                                            <td></td>
                                            {this.props.reportData.value &&
                                              this.props.reportData.volume && (
                                                <>
                                                  <td></td>
                                                  <td></td>
                                                </>
                                              )}
                                          </tr>
                                          {item["toc_component"].map(
                                            (subItem, toc2_index) => {
                                              if (this.props.reportData.value) {
                                                totalStart += Number(
                                                  this.roundToTwo(
                                                    subItem?.split[0]
                                                      .toString()
                                                      .includes("%")
                                                      ? subItem?.split[0]
                                                          .split("%")[0]
                                                          .toString()
                                                      : subItem?.split[0].toString()
                                                  )
                                                );
                                                totalEnd += Number(
                                                  this.roundToTwo(
                                                    subItem?.split[1]
                                                      .toString()
                                                      .includes("%")
                                                      ? subItem?.split[1]
                                                          .split("%")[0]
                                                          .toString()
                                                      : subItem?.split[1].toString()
                                                  )
                                                );
                                              }
                                              if (
                                                this.props.reportData.volume
                                              ) {
                                                totalVStart += Number(
                                                  this.roundToTwo(
                                                    subItem?.vsplit[0]
                                                      .toString()
                                                      .includes("%")
                                                      ? subItem?.vsplit[0]
                                                          .split("%")[0]
                                                          .toString()
                                                      : subItem?.vsplit[0].toString()
                                                  )
                                                );
                                                totalVEnd += Number(
                                                  this.roundToTwo(
                                                    subItem?.vsplit[1]
                                                      .toString()
                                                      .includes("%")
                                                      ? subItem?.vsplit[1]
                                                          .split("%")[0]
                                                          .toString()
                                                      : subItem?.vsplit[1].toString()
                                                  )
                                                );
                                              }
                                              return (
                                                <React.Fragment>
                                                  <tr
                                                    key={toc2_index}
                                                    style={{ color: "black" }}
                                                    id="addr0"
                                                  >
                                                    <td>
                                                      {subItem["toc2_name"]}
                                                    </td>
                                                    {this.props.reportData
                                                      .value && (
                                                      <>
                                                        <td
                                                          style={{
                                                            width: "15rem",
                                                          }}
                                                        >
                                                          <input
                                                            style={{
                                                              width: "7rem",
                                                            }}
                                                            value={
                                                              subItem?.split[0]
                                                            }
                                                            onInput={(e) => {
                                                              let countryName =
                                                                tocreg.country;
                                                              let obj = [
                                                                countryName,
                                                                i,
                                                                tocindex,
                                                                toc_index,
                                                                toc2_index,
                                                                subItem[
                                                                  "toc2_name"
                                                                ],
                                                                "startSplit",
                                                                "value",
                                                              ];
                                                              this.handleChangeSplitTOC2(
                                                                e,
                                                                obj
                                                              );
                                                            }}
                                                            onPaste={(e) => {
                                                              this.handlePaste(
                                                                e
                                                              );
                                                            }}
                                                          />
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: "15rem",
                                                          }}
                                                        >
                                                          <input
                                                            style={{
                                                              width: "7rem",
                                                            }}
                                                            value={
                                                              subItem?.split[1]
                                                            }
                                                            onInput={(e) => {
                                                              let countryName =
                                                                tocreg.country;
                                                              let obj = [
                                                                countryName,
                                                                i,
                                                                tocindex,
                                                                toc_index,
                                                                toc2_index,
                                                                subItem[
                                                                  "toc2_name"
                                                                ],
                                                                "endSplit",
                                                                "value",
                                                              ];
                                                              this.handleChangeSplitTOC2(
                                                                e,
                                                                obj
                                                              );
                                                            }}
                                                            onPaste={(e) => {
                                                              this.handlePaste(
                                                                e
                                                              );
                                                            }}
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                    {this.props.reportData
                                                      .volume && (
                                                      <>
                                                        <td
                                                          style={{
                                                            width: "15rem",
                                                          }}
                                                        >
                                                          <input
                                                            style={{
                                                              width: "7rem",
                                                            }}
                                                            value={
                                                              subItem?.vsplit[0]
                                                            }
                                                            onInput={(e) => {
                                                              let countryName =
                                                                tocreg.country;
                                                              let obj = [
                                                                countryName,
                                                                i,
                                                                tocindex,
                                                                toc_index,
                                                                toc2_index,
                                                                subItem[
                                                                  "toc2_name"
                                                                ],
                                                                "startSplit",
                                                                "volume",
                                                              ];
                                                              this.handleChangeSplitTOC2(
                                                                e,
                                                                obj
                                                              );
                                                            }}
                                                            onPaste={(e) => {
                                                              this.handlePaste(
                                                                e
                                                              );
                                                            }}
                                                          />
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: "15rem",
                                                          }}
                                                        >
                                                          <input
                                                            style={{
                                                              width: "7rem",
                                                            }}
                                                            value={
                                                              subItem?.vsplit[1]
                                                            }
                                                            onInput={(e) => {
                                                              let countryName =
                                                                tocreg.country;
                                                              let obj = [
                                                                countryName,
                                                                i,
                                                                tocindex,
                                                                toc_index,
                                                                toc2_index,
                                                                subItem[
                                                                  "toc2_name"
                                                                ],
                                                                "endSplit",
                                                                "volume",
                                                              ];
                                                              this.handleChangeSplitTOC2(
                                                                e,
                                                                obj
                                                              );
                                                            }}
                                                            onPaste={(e) => {
                                                              this.handlePaste(
                                                                e
                                                              );
                                                            }}
                                                          />
                                                        </td>
                                                      </>
                                                    )}
                                                  </tr>
                                                  {item["toc_component"]
                                                    .length -
                                                    1 ==
                                                  toc2_index ? (
                                                    <tr>
                                                      <td>Total</td>
                                                      {this.props.reportData
                                                        .value && (
                                                        <>
                                                          <td>
                                                            {totalStart &&
                                                            totalStart.toFixed(
                                                              2
                                                            ) >= 99.9 &&
                                                            totalStart.toFixed(
                                                              2
                                                            ) <= 100.1
                                                              ? 100
                                                              : totalStart}
                                                          </td>
                                                          <td>
                                                            {totalEnd &&
                                                            totalEnd.toFixed(
                                                              2
                                                            ) >= 99.9 &&
                                                            totalEnd.toFixed(
                                                              2
                                                            ) <= 100.1
                                                              ? 100
                                                              : totalEnd}
                                                          </td>
                                                        </>
                                                      )}
                                                      {this.props.reportData
                                                        .volume && (
                                                        <>
                                                          <td>
                                                            {totalVStart.toFixed(
                                                              2
                                                            ) >= 99.9 &&
                                                            totalVStart.toFixed(
                                                              2
                                                            ) <= 100.1
                                                              ? 100
                                                              : totalVStart}
                                                          </td>
                                                          <td>
                                                            {totalVEnd.toFixed(
                                                              2
                                                            ) >= 99.9 &&
                                                            totalVEnd.toFixed(
                                                              2
                                                            ) <= 100.1
                                                              ? 100
                                                              : totalVEnd}
                                                          </td>
                                                        </>
                                                      )}
                                                    </tr>
                                                  ) : null}
                                                </React.Fragment>
                                              );
                                            }
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                  {tocreg["toc"].map(
                                    (item, toc_index) =>
                                      item["toc_component"] &&
                                      item["toc_component"].length > 0 &&
                                      item["toc_component"].map(
                                        (subItem, toc2_index) => {
                                          let totalStart = 0;
                                          let totalEnd = 0;
                                          let totalVStart = 0;
                                          let totalVEnd = 0;
                                          return (
                                            <React.Fragment>
                                              <tr
                                                key={toc2_index}
                                                style={{
                                                  color: "black",
                                                  backgroundColor: "#b8b8b8",
                                                }}
                                                id="addr0"
                                              >
                                                <td style={{ width: "15rem" }}>
                                                  {subItem["toc2_name"]} (Level
                                                  2)
                                                </td>
                                                <td className="w-15"></td>
                                                <td></td>
                                                {this.props.reportData.value &&
                                                  this.props.reportData
                                                    .volume && (
                                                    <>
                                                      <td></td>
                                                      <td></td>
                                                    </>
                                                  )}
                                              </tr>

                                              {subItem["toc2_component"] &&
                                                subItem["toc2_component"]
                                                  .length > 0 &&
                                                subItem["toc2_component"].map(
                                                  (subsubItem, toc3_index) => {
                                                    if (
                                                      this.props.reportData
                                                        .value
                                                    ) {
                                                      totalStart += Number(
                                                        this.roundToTwo(
                                                          subsubItem?.split[0]
                                                            .toString()
                                                            .toString()
                                                            .includes("%")
                                                            ? subsubItem?.split[0]
                                                                .toString()
                                                                .split("%")[0]
                                                                .toString()
                                                            : subsubItem?.split[0].toString()
                                                        )
                                                      );
                                                      totalEnd += Number(
                                                        this.roundToTwo(
                                                          subsubItem?.split[1]
                                                            .toString()
                                                            .toString()
                                                            .includes("%")
                                                            ? subsubItem?.split[1]
                                                                .toString()
                                                                .split("%")[0]
                                                                .toString()
                                                            : subsubItem?.split[1].toString()
                                                        )
                                                      );
                                                    }
                                                    if (
                                                      this.props.reportData
                                                        .volume
                                                    ) {
                                                      totalVStart += Number(
                                                        this.roundToTwo(
                                                          subsubItem?.vsplit[0]
                                                            .toString()
                                                            .toString()
                                                            .includes("%")
                                                            ? subsubItem?.vsplit[0]
                                                                .toString()
                                                                .split("%")[0]
                                                                .toString()
                                                            : subsubItem?.vsplit[0].toString()
                                                        )
                                                      );
                                                      totalVEnd += Number(
                                                        this.roundToTwo(
                                                          subsubItem?.vsplit[1]
                                                            .toString()
                                                            .toString()
                                                            .includes("%")
                                                            ? subsubItem?.vsplit[1]
                                                                .toString()
                                                                .split("%")[0]
                                                                .toString()
                                                            : subsubItem?.vsplit[1].toString()
                                                        )
                                                      );
                                                    }
                                                    return (
                                                      <React.Fragment>
                                                        <tr
                                                          key={toc3_index}
                                                          style={{
                                                            color: "black",
                                                          }}
                                                        >
                                                          <td>
                                                            {
                                                              subsubItem[
                                                                "toc3_name"
                                                              ]
                                                            }
                                                          </td>
                                                          {this.props.reportData
                                                            .value && (
                                                            <>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "15rem",
                                                                }}
                                                              >
                                                                <input
                                                                  style={{
                                                                    width:
                                                                      "7rem",
                                                                  }}
                                                                  value={
                                                                    subsubItem
                                                                      ?.split[0]
                                                                  }
                                                                  onInput={(
                                                                    e
                                                                  ) => {
                                                                    let countryName =
                                                                      tocreg.country;
                                                                    let obj = [
                                                                      countryName,
                                                                      i,
                                                                      tocindex,
                                                                      toc_index,
                                                                      toc2_index,
                                                                      toc3_index,
                                                                      subsubItem[
                                                                        "toc3_name"
                                                                      ],
                                                                      "startSplit",
                                                                      "value",
                                                                    ];
                                                                    this.handleChangeSplitTOC3(
                                                                      e,
                                                                      obj
                                                                    );
                                                                  }}
                                                                  onPaste={(
                                                                    e
                                                                  ) => {
                                                                    this.handlePaste(
                                                                      e
                                                                    );
                                                                  }}
                                                                />
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "15rem",
                                                                }}
                                                              >
                                                                <input
                                                                  style={{
                                                                    width:
                                                                      "7rem",
                                                                  }}
                                                                  value={
                                                                    subsubItem
                                                                      ?.split[1]
                                                                  }
                                                                  onInput={(
                                                                    e
                                                                  ) => {
                                                                    let countryName =
                                                                      tocreg.country;
                                                                    let obj = [
                                                                      countryName,
                                                                      i,
                                                                      tocindex,
                                                                      toc_index,
                                                                      toc2_index,
                                                                      toc3_index,
                                                                      subsubItem[
                                                                        "toc3_name"
                                                                      ],
                                                                      "endSplit",
                                                                      "value",
                                                                    ];
                                                                    this.handleChangeSplitTOC3(
                                                                      e,
                                                                      obj
                                                                    );
                                                                  }}
                                                                  onPaste={(
                                                                    e
                                                                  ) => {
                                                                    this.handlePaste(
                                                                      e
                                                                    );
                                                                  }}
                                                                />
                                                              </td>
                                                            </>
                                                          )}
                                                          {this.props.reportData
                                                            .volume && (
                                                            <>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "15rem",
                                                                }}
                                                              >
                                                                <input
                                                                  style={{
                                                                    width:
                                                                      "7rem",
                                                                  }}
                                                                  value={
                                                                    subsubItem
                                                                      ?.vsplit[0]
                                                                  }
                                                                  onInput={(
                                                                    e
                                                                  ) => {
                                                                    let countryName =
                                                                      tocreg.country;
                                                                    let obj = [
                                                                      countryName,
                                                                      i,
                                                                      tocindex,
                                                                      toc_index,
                                                                      toc2_index,
                                                                      toc3_index,
                                                                      subsubItem[
                                                                        "toc3_name"
                                                                      ],
                                                                      "startSplit",
                                                                      "volume",
                                                                    ];
                                                                    this.handleChangeSplitTOC3(
                                                                      e,
                                                                      obj
                                                                    );
                                                                  }}
                                                                  onPaste={(
                                                                    e
                                                                  ) => {
                                                                    this.handlePaste(
                                                                      e
                                                                    );
                                                                  }}
                                                                />
                                                              </td>
                                                              <td
                                                                style={{
                                                                  width:
                                                                    "15rem",
                                                                }}
                                                              >
                                                                <input
                                                                  style={{
                                                                    width:
                                                                      "7rem",
                                                                  }}
                                                                  value={
                                                                    subsubItem
                                                                      ?.vsplit[1]
                                                                  }
                                                                  onInput={(
                                                                    e
                                                                  ) => {
                                                                    let countryName =
                                                                      tocreg.country;
                                                                    let obj = [
                                                                      countryName,
                                                                      i,
                                                                      tocindex,
                                                                      toc_index,
                                                                      toc2_index,
                                                                      toc3_index,
                                                                      subsubItem[
                                                                        "toc3_name"
                                                                      ],
                                                                      "endSplit",
                                                                      "volume",
                                                                    ];
                                                                    this.handleChangeSplitTOC3(
                                                                      e,
                                                                      obj
                                                                    );
                                                                  }}
                                                                  onPaste={(
                                                                    e
                                                                  ) => {
                                                                    this.handlePaste(
                                                                      e
                                                                    );
                                                                  }}
                                                                />
                                                              </td>
                                                            </>
                                                          )}
                                                        </tr>
                                                        {subItem[
                                                          "toc2_component"
                                                        ].length -
                                                          1 ==
                                                        toc3_index ? (
                                                          <tr>
                                                            <td>Total</td>
                                                            {this.props
                                                              .reportData
                                                              .value && (
                                                              <>
                                                                <td>
                                                                  {totalStart &&
                                                                  totalStart.toFixed(
                                                                    2
                                                                  ) >= 99.9 &&
                                                                  totalStart.toFixed(
                                                                    2
                                                                  ) <= 100.1
                                                                    ? 100
                                                                    : totalStart}
                                                                </td>
                                                                <td>
                                                                  {totalEnd &&
                                                                  totalEnd.toFixed(
                                                                    2
                                                                  ) >= 99.9 &&
                                                                  totalEnd.toFixed(
                                                                    2
                                                                  ) <= 100.1
                                                                    ? 100
                                                                    : totalEnd}
                                                                </td>
                                                              </>
                                                            )}
                                                            {this.props
                                                              .reportData
                                                              .volume && (
                                                              <>
                                                                <td>
                                                                  {totalVStart.toFixed(
                                                                    2
                                                                  ) >= 99.9 &&
                                                                  totalVStart.toFixed(
                                                                    2
                                                                  ) <= 100.1
                                                                    ? 100
                                                                    : totalVStart}
                                                                </td>
                                                                <td>
                                                                  {totalVEnd.toFixed(
                                                                    2
                                                                  ) >= 99.9 &&
                                                                  totalVEnd.toFixed(
                                                                    2
                                                                  ) <= 100.1
                                                                    ? 100
                                                                    : totalVEnd}
                                                                </td>
                                                              </>
                                                            )}
                                                          </tr>
                                                        ) : null}
                                                      </React.Fragment>
                                                    );
                                                  }
                                                )}
                                            </React.Fragment>
                                          );
                                        }
                                      )
                                  )}

                                  {tocreg["toc"].map(
                                    (item, toc_index) =>
                                      item["toc_component"] &&
                                      item["toc_component"].length > 0 &&
                                      item["toc_component"].map(
                                        (subItem, toc2_index) => (
                                          <React.Fragment>
                                            {subItem["toc2_component"] &&
                                              subItem["toc2_component"].length >
                                                0 &&
                                              subItem["toc2_component"].map(
                                                (subsubItem, toc3_index) => {
                                                  let totalStart = 0;
                                                  let totalEnd = 0;
                                                  let totalVStart = 0;
                                                  let totalVEnd = 0;
                                                  return (
                                                    <React.Fragment>
                                                      <tr
                                                        key={toc3_index}
                                                        style={{
                                                          color: "black",
                                                          backgroundColor:
                                                            "#b8b8b8",
                                                        }}
                                                        id="addr0"
                                                      >
                                                        <td>
                                                          {
                                                            subsubItem[
                                                              "toc3_name"
                                                            ]
                                                          }{" "}
                                                          (Level 3)
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        {this.props.reportData
                                                          .value &&
                                                          this.props.reportData
                                                            .volume && (
                                                            <>
                                                              <td></td>
                                                              <td></td>
                                                            </>
                                                          )}
                                                      </tr>
                                                      {subsubItem[
                                                        "toc3_component"
                                                      ] &&
                                                        subsubItem[
                                                          "toc3_component"
                                                        ].length > 0 &&
                                                        subsubItem[
                                                          "toc3_component"
                                                        ].map(
                                                          (
                                                            subsubsubItem,
                                                            toc4_index
                                                          ) => {
                                                            if (
                                                              this.props
                                                                .reportData
                                                                .value
                                                            ) {
                                                              totalStart +=
                                                                Number(
                                                                  this.roundToTwo(
                                                                    subsubsubItem?.split[0]
                                                                      .toString()
                                                                      .toString()
                                                                      .includes(
                                                                        "%"
                                                                      )
                                                                      ? subsubsubItem?.split[0]
                                                                          .toString()
                                                                          .split(
                                                                            "%"
                                                                          )[0]
                                                                          .toString()
                                                                      : subsubsubItem?.split[0].toString()
                                                                  )
                                                                );
                                                              totalEnd +=
                                                                Number(
                                                                  this.roundToTwo(
                                                                    subsubsubItem?.split[1]
                                                                      .toString()
                                                                      .toString()
                                                                      .includes(
                                                                        "%"
                                                                      )
                                                                      ? subsubsubItem?.split[1]
                                                                          .toString()
                                                                          .split(
                                                                            "%"
                                                                          )[0]
                                                                          .toString()
                                                                      : subsubsubItem?.split[1].toString()
                                                                  )
                                                                );
                                                            }
                                                            if (
                                                              this.props
                                                                .reportData
                                                                .volume
                                                            ) {
                                                              totalVStart +=
                                                                Number(
                                                                  this.roundToTwo(
                                                                    subsubsubItem?.vsplit[0]
                                                                      .toString()
                                                                      .toString()
                                                                      .includes(
                                                                        "%"
                                                                      )
                                                                      ? subsubsubItem?.vsplit[0]
                                                                          .toString()
                                                                          .split(
                                                                            "%"
                                                                          )[0]
                                                                          .toString()
                                                                      : subsubsubItem?.vsplit[0].toString()
                                                                  )
                                                                );
                                                              totalVEnd +=
                                                                Number(
                                                                  this.roundToTwo(
                                                                    subsubsubItem?.vsplit[1]
                                                                      .toString()
                                                                      .toString()
                                                                      .includes(
                                                                        "%"
                                                                      )
                                                                      ? subsubsubItem?.vsplit[1]
                                                                          .toString()
                                                                          .split(
                                                                            "%"
                                                                          )[0]
                                                                          .toString()
                                                                      : subsubsubItem?.vsplit[1].toString()
                                                                  )
                                                                );
                                                            }
                                                            return (
                                                              <React.Fragment>
                                                                <tr
                                                                  key={
                                                                    toc4_index
                                                                  }
                                                                  style={{
                                                                    color:
                                                                      "black",
                                                                  }}
                                                                >
                                                                  <td>
                                                                    {
                                                                      subsubsubItem[
                                                                        "toc4_name"
                                                                      ]
                                                                    }
                                                                  </td>
                                                                  {this.props
                                                                    .reportData
                                                                    .value && (
                                                                    <>
                                                                      <td
                                                                        style={{
                                                                          width:
                                                                            "15rem",
                                                                        }}
                                                                      >
                                                                        <input
                                                                          style={{
                                                                            width:
                                                                              "7rem",
                                                                          }}
                                                                          value={
                                                                            subsubsubItem
                                                                              ?.split[0]
                                                                          }
                                                                          onInput={(
                                                                            e
                                                                          ) => {
                                                                            let countryName =
                                                                              tocreg.country;
                                                                            let obj =
                                                                              [
                                                                                countryName,
                                                                                i,
                                                                                tocindex,
                                                                                toc_index,
                                                                                toc2_index,
                                                                                toc3_index,
                                                                                toc4_index,
                                                                                subsubsubItem[
                                                                                  "toc4_name"
                                                                                ],
                                                                                "startSplit",
                                                                                "value",
                                                                              ];
                                                                            this.handleChangeSplitTOC4(
                                                                              e,
                                                                              obj
                                                                            );
                                                                          }}
                                                                          onPaste={(
                                                                            e
                                                                          ) => {
                                                                            this.handlePaste(
                                                                              e
                                                                            );
                                                                          }}
                                                                        />
                                                                      </td>
                                                                      <td
                                                                        style={{
                                                                          width:
                                                                            "15rem",
                                                                        }}
                                                                      >
                                                                        <input
                                                                          style={{
                                                                            width:
                                                                              "7rem",
                                                                          }}
                                                                          value={
                                                                            subsubsubItem
                                                                              ?.split[1]
                                                                          }
                                                                          onInput={(
                                                                            e
                                                                          ) => {
                                                                            let countryName =
                                                                              tocreg.country;
                                                                            let obj =
                                                                              [
                                                                                countryName,
                                                                                i,
                                                                                tocindex,
                                                                                toc_index,
                                                                                toc2_index,
                                                                                toc3_index,
                                                                                toc4_index,
                                                                                subsubsubItem[
                                                                                  "toc4_name"
                                                                                ],
                                                                                "endSplit",
                                                                                "value",
                                                                              ];
                                                                            this.handleChangeSplitTOC4(
                                                                              e,
                                                                              obj
                                                                            );
                                                                          }}
                                                                          onPaste={(
                                                                            e
                                                                          ) => {
                                                                            this.handlePaste(
                                                                              e
                                                                            );
                                                                          }}
                                                                        />
                                                                      </td>
                                                                    </>
                                                                  )}
                                                                  {this.props
                                                                    .reportData
                                                                    .volume && (
                                                                    <>
                                                                      <td
                                                                        style={{
                                                                          width:
                                                                            "15rem",
                                                                        }}
                                                                      >
                                                                        <input
                                                                          style={{
                                                                            width:
                                                                              "7rem",
                                                                          }}
                                                                          value={
                                                                            subsubsubItem
                                                                              ?.vsplit[0]
                                                                          }
                                                                          onInput={(
                                                                            e
                                                                          ) => {
                                                                            let countryName =
                                                                              tocreg.country;
                                                                            let obj =
                                                                              [
                                                                                countryName,
                                                                                i,
                                                                                tocindex,
                                                                                toc_index,
                                                                                toc2_index,
                                                                                toc3_index,
                                                                                toc4_index,
                                                                                subsubsubItem[
                                                                                  "toc4_name"
                                                                                ],
                                                                                "startSplit",
                                                                                "volume",
                                                                              ];
                                                                            this.handleChangeSplitTOC4(
                                                                              e,
                                                                              obj
                                                                            );
                                                                          }}
                                                                          onPaste={(
                                                                            e
                                                                          ) => {
                                                                            this.handlePaste(
                                                                              e
                                                                            );
                                                                          }}
                                                                        />
                                                                      </td>
                                                                      <td
                                                                        style={{
                                                                          width:
                                                                            "15rem",
                                                                        }}
                                                                      >
                                                                        <input
                                                                          style={{
                                                                            width:
                                                                              "7rem",
                                                                          }}
                                                                          value={
                                                                            subsubsubItem
                                                                              ?.vsplit[1]
                                                                          }
                                                                          onInput={(
                                                                            e
                                                                          ) => {
                                                                            let countryName =
                                                                              tocreg.country;
                                                                            let obj =
                                                                              [
                                                                                countryName,
                                                                                i,
                                                                                tocindex,
                                                                                toc_index,
                                                                                toc2_index,
                                                                                toc3_index,
                                                                                toc4_index,
                                                                                subsubsubItem[
                                                                                  "toc4_name"
                                                                                ],
                                                                                "endSplit",
                                                                                "volume",
                                                                              ];
                                                                            this.handleChangeSplitTOC4(
                                                                              e,
                                                                              obj
                                                                            );
                                                                          }}
                                                                          onPaste={(
                                                                            e
                                                                          ) => {
                                                                            this.handlePaste(
                                                                              e
                                                                            );
                                                                          }}
                                                                        />
                                                                      </td>
                                                                    </>
                                                                  )}
                                                                </tr>
                                                                {subsubItem[
                                                                  "toc3_component"
                                                                ].length -
                                                                  1 ==
                                                                toc4_index ? (
                                                                  <tr>
                                                                    <td>
                                                                      Total
                                                                    </td>
                                                                    {this.props
                                                                      .reportData
                                                                      .value && (
                                                                      <>
                                                                        <td>
                                                                          {totalStart &&
                                                                          totalStart.toFixed(
                                                                            2
                                                                          ) >=
                                                                            99.9 &&
                                                                          totalStart.toFixed(
                                                                            2
                                                                          ) <=
                                                                            100.1
                                                                            ? 100
                                                                            : totalStart}
                                                                        </td>
                                                                        <td>
                                                                          {totalEnd &&
                                                                          totalEnd.toFixed(
                                                                            2
                                                                          ) >=
                                                                            99.9 &&
                                                                          totalEnd.toFixed(
                                                                            2
                                                                          ) <=
                                                                            100.1
                                                                            ? 100
                                                                            : totalEnd}
                                                                        </td>
                                                                      </>
                                                                    )}
                                                                    {this.props
                                                                      .reportData
                                                                      .volume && (
                                                                      <>
                                                                        <td>
                                                                          {totalVStart.toFixed(
                                                                            2
                                                                          ) >=
                                                                            99.9 &&
                                                                          totalVStart.toFixed(
                                                                            2
                                                                          ) <=
                                                                            100.1
                                                                            ? 100
                                                                            : totalVStart}
                                                                        </td>
                                                                        <td>
                                                                          {totalVEnd.toFixed(
                                                                            2
                                                                          ) >=
                                                                            99.9 &&
                                                                          totalVEnd.toFixed(
                                                                            2
                                                                          ) <=
                                                                            100.1
                                                                            ? 100
                                                                            : totalVEnd}
                                                                        </td>
                                                                      </>
                                                                    )}
                                                                  </tr>
                                                                ) : null}
                                                              </React.Fragment>
                                                            );
                                                          }
                                                        )}
                                                    </React.Fragment>
                                                  );
                                                }
                                              )}
                                          </React.Fragment>
                                        )
                                      )
                                  )}
                                </tbody>
                              </React.Fragment>
                            </table>
                            {this.state.pageSubIndex <= data.tocreg.length && (
                              <React.Fragment>
                                <Button
                                  variant="contained"
                                  style={{ margin: "10px" }}
                                  onClick={() => {
                                    if (
                                      this.state.pageSubIndex ==
                                      data.tocreg.length - 1
                                    )
                                      this.handleSubmit(i, data.tocreg.length);
                                    else this.handleNext(data.tocreg.length, i);
                                  }}
                                >
                                  {this.state.pageSubIndex ==
                                  data.tocreg.length - 1
                                    ? "Submit"
                                    : "Next"}
                                </Button>
                                {this.state.pageSubIndex == 0 &&
                                  this.props.reportData.geography !=
                                    "Country" && (
                                    <Button
                                      variant="contained"
                                      style={{ margin: "10px" }}
                                      onClick={() => {
                                        this.handleCreateVariation(i);
                                      }}
                                    >
                                      Create Variation
                                    </Button>
                                  )}
                              </React.Fragment>
                            )}

                            {this.state.pageSubIndex > 0 && (
                              <Button
                                style={{ margin: "10px" }}
                                variant="contained"
                                onClick={() =>
                                  this.handlePrevious(data.tocreg.length)
                                }
                              >
                                Back
                              </Button>
                            )}
                          </React.Fragment>
                        )
                    )}
                </React.Fragment>
              )
          )}
        {
          <Collapse in={this.state.open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {this.state.modalText}
            </Alert>
          </Collapse>
        }
        {this.state.loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <ToastsContainer store={ToastsStore} position="top_center" />
      </React.Fragment>
    );
  }
}

export default InputForcast;
