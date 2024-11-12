import React, { Component } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputForcast from "./InputForecast";
import CreatableSelect from "react-select/creatable";
import "./Report.css";
import parse from "paste-from-excel";
import { API_URL } from "../config";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { jssPreset } from "@material-ui/core";

const country = [
  {
    id: 1,
    region: "North America",
    country: [
      { value: "US", label: "US", country: "US", split: [] },
      { value: "Canada", label: "Canada", country: "Canada", split: [] },
    ],
  },
  {
    id: 2,
    region: "Asia",
    country: [
      { value: "India", label: "India", country: "India", split: [] },
      { value: "China", label: "China", country: "China", split: [] },
    ],
  },
];

export default class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      endYearRange: [],
      selectedDropCountries: [],
      validCountrySplit: [],
      country: [
        {
          id: 1,
          region: "North America",
          country: [
            { value: "US", label: "US", country: "US", split: [] },
            { value: "Canada", label: "Canada", country: "Canada", split: [] },
          ],
        },
        {
          id: 2,
          region: "Asia",
          country: [
            { value: "India", label: "India", country: "India", split: [] },
            { value: "China", label: "China", country: "China", split: [] },
          ],
        },
      ],
      tocL1Value: [],
      tocL2Value: [],
      tocL3Value: [],
      tocL4Value: [],
      reportName: "",
      pageIndex: 0,
      industry: "",
      startYear: "",
      endYear: "",
      yearRange: null,
      typeByValue: null,
      typeByVolume: null,
      tocArr: [],
      forcast: false,
      geography: "",
      countries: { inputs: [] },
      periodSplit: { inputs: [] },
      multipleRegionSplit: {},
      pageName: "toc_Levels",
      selectedCountries: [],
      m1 : "",
      // regionSplit_selreg :[],
      // regionSplit_selcon:[],
      countryList: [],
      volumeSplit: { inputs: [] },
      regionCountriesForRegionalAccess: [],
      selectedRegionForRegionalAccess: "",
      tocL1: "",
      openDialog1: false,
      openDialog2: false,
      openDialog3: false,
      openDialog4: false,
      tableSplit: true,
      regiondet: null,
    };
  }

  componentDidMount() {
    let date = new Date();
    let currentYear = date.getFullYear();
    let nextYears = [];
    let previousYears = [];
    for (let i = 10; i >= 1; i--) {
      previousYears.push(currentYear - i);
    }
    for (let i = 1; i <= 10; i++) {
      nextYears.push(currentYear + i);
    }
    let yearRange = [...previousYears, currentYear, ...nextYears];
    this.setState({ yearRange });

    axios
      .get(`${API_URL}/reportgen/region/data/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((data) => this.setState({ country: data.data }))
      .catch((err) => console.log(err));

    // console.log(JSON.stringify(this.state.country))

    if (this.props.editData && Object.keys(this.props.editData).length > 0) {
      let {
        reportname,
        industry,
        base_year,
        endyear,
        geography,
        valueunit,
        volumeunit,
        toc,
        year,
        tablesplit,
        region,
        market,
        ASP,
      } = this.props.editData;
      // console.log(this.props.editData);
      this.setState({
        reportName: reportname,
        industry,
        startYear: base_year,
        endYear: endyear,
        typeByValue: valueunit,
        typeByVolume: volumeunit,
        geography,
        periodSplit: { inputs: [year] },
        tableSplit: tablesplit,
        regiondet: region,
        volumeSplit: { inputs: [ASP] },
      });

      let endYearRange = [];
      for (let index = 0; index < 20; index++) {
        endYearRange.push(base_year + index + 1);
      }
      this.setState({
        endYearRange: endYearRange,
      });
    

      let tempRegionSplit = { ...this.state.countries };
      // console.log(...this.state.countries )
      if (geography == "Global") {
        // console.log(JSON.stringify(toc[0].tocreg[0]))
        // console.log(JSON.stringify(toc[0].tocreg[0].toc));
        this.setState({
          tocL1Value: toc[0].tocreg[0].toc,
          tocArr: toc[0].tocreg[0].toc,
        });
        // console.log(this.state.tocL1Value);
        // console.log(JSON.stringify(region),"hghfghghgh");
        for (let index = 0; index < toc.length; index++) {

          tempRegionSplit.inputs[index] = {
            split: toc[index]["split"],
            vsplit: toc[index]["vsplit"],
            tocreg: toc[index].tocreg,
            region: toc[index]["region"],
          };
          let regionSplit = { ...this.state.multipleRegionSplit };
      
      let selectedRegions = Object.keys(region);
      for (let index = 0; index < selectedRegions.length; index++) {
        regionSplit[selectedRegions[index]] = {
          split: toc[index]["split"],
          vsplit: toc[index]["vsplit"],
        };
      }
      let sortedRegion = {
        "North America": regionSplit["North America"],
        "Europe": regionSplit["Europe"],
        "Asia-Pacific": regionSplit["Asia-Pacific"],
        "Rest of World": regionSplit["Rest of World"],
      };

      this.setState({ multipleRegionSplit: sortedRegion });
      // console.log(this.state.multipleRegionSplit)
      let tempArray = [];
      for (let index = 0; index < Object.keys(region).length; index++) {
        tempArray.push({
          region: Object.keys(region)[index],
          country: Object.values(region)[index],
        });
      }
      this.setState({ selectedDropCountries: tempArray });
        }
      } else if (geography == "Regional") {
        // console.log(JSON.stringify(toc[0].toc));
        this.setState({ tocL1Value: toc[0].toc, tocArr: toc[0].toc});
        // console.log(JSON.stringify(market));

          tempRegionSplit.inputs =[ {
            split: [],
            vsplit:[],
            tocreg: toc,
            region: market
        
        }]
        // console.log(JSON.stringify(this.props.editData.region[market]))
        let regionSplit_selreg = { ...this.state.regionCountriesForRegionalAccess };
        regionSplit_selreg=[{"id":1,"region":market,"country":this.props.editData.region[market]}]
        this.setState({regionCountriesForRegionalAccess:regionSplit_selreg} )
        this.setState({selectedCountries:this.props.editData.region[market]} )
        // console.log(this.state.regionCountriesForRegionalAccess       )
        

        // let selectedRegions = {market};
        // for (let index = 0; index < selectedRegions.length; index++) {
        //   regionSplit[selectedRegions[index]] = {
        //     split: [],
        //     vsplit: [],
        // };}

      } else if (geography == "Country") {
        this.setState({m1 : market});
        for (let index = 0; index < toc.length; index++) {
          tempRegionSplit.inputs[index] = {
            
            split: [toc[index]["split"]],
            tocreg: [{"label": market,"value": market,
            "country": market,
            "toc": toc}],
            region: toc[index]["region"],
          };
        }
        
        this.setState({ tocL1Value: toc, tocArr: toc });
        this.setState({selectedCountries : {"value":market,"label":market,"country":market}})
      }
      console.log(tempRegionSplit);
      this.setState({ countries: tempRegionSplit }, () => {
        console.log(this.state.countries, "countries");
      });

      
      // let tempArray = [];
      // for (let index = 0; index < Object.keys(region).length; index++) {
      //   tempArray.push({
      //     region: Object.keys(region)[index],
      //     country: Object.values(region)[index],
      //   });
      // }
      // this.setState({ selectedDropCountries: tempArray });
    }
  }

  handleSaveTocLevel = () => {
    // if (this.props.editData) {
      let countrie = { ...this.state.countries };
      for (let i = 0; i < countrie.inputs.length; i++) {
        for (let j = 0; j < countrie.inputs[i]["tocreg"].length; j++) {
          countrie.inputs[i]["tocreg"][j]["toc"] = this.state.tocArr;
        }
      }
      this.setState({ countries: countrie, forcast: true });
    // }
    this.setState({ forcast: true });
  };

  handleCountryChange = (region, e) => {
    // console.log(e);
    if (
      (this.props.editData && Object.keys(this.props.editData).length > 0) ||
      this.state.geography == "Global"
    ) {
      let tempArr = { ...this.state.countries };
      let tempSelectedCountries = [...this.state.selectedDropCountries];

      this.setState({
        selectedCountries: e,
        selectedDropCountries: { region: region, country: e },
      });
      if (region == "country") {
        tempSelectedCountries[0] = { country: [e], region: region };
        tempArr.inputs[0] = { tocreg: [e] };
        this.setState({
          countries: tempArr,
          selectedDropCountries: tempSelectedCountries,
        });
      } else {
        for (
          let i = 0, j = 0;
          i < tempArr.inputs.length, j < tempSelectedCountries.length;
          i++, j++
        ) {
          if (tempSelectedCountries[j]["region"] == region) {
            tempSelectedCountries[j].country = e;
            // tempSelectedCountries.splice(j, 1);
            // tempSelectedCountries.push({ region: region, country: e });
          }
          if (tempArr.inputs[i]["region"] == region) {
            tempArr.inputs[i].split = [];
            tempArr.inputs[i].vsplit = [];
            tempArr.inputs[i].tocreg = e;
            // tempArr.inputs.splice(i, 1);
            // tempArr.inputs.push({ region: region, split: [], tocreg: e });

            this.setState({
              countries: tempArr,
              selectedDropCountries: tempSelectedCountries,
            });
            return;
          }
        }
        tempArr.inputs.push({ region: region, split: [],vsplit: [], tocreg: e });
        tempSelectedCountries.push({ region: region, country: e });

        this.setState({
          countries: tempArr,
          selectedDropCountries: tempSelectedCountries,
        });
      }
    } else {
      let tempArr = { ...this.state.countries };

      this.setState({ selectedCountries: e });
      if (region == "country") {
        tempArr.inputs[0] = { tocreg: [e] };
        this.setState({ countries: tempArr });
      } else {
        for (let i = 0; i < tempArr.inputs.length; i++) {
          if (tempArr.inputs[i]["region"] == region) {
            tempArr.inputs.splice(i, 1);
            tempArr.inputs.push({ region: region, split: [],vsplit: [], tocreg: e });

            this.setState({ countries: tempArr });
            return;
          }
        }
        tempArr.inputs.push({ region: region, split: [], vsplit: [], tocreg: e });

        this.setState({ countries: tempArr });
      }
    }
  };

  handleselectedRegionCountries = (e) => {
    this.setState({
      countries: { inputs: [{ region: e }] },
      selectedRegionForRegionalAccess: e,
    });
    let tempCountrySource = this.state.country.filter((data) => {
      return data.region == e;
    });
    this.setState({ regionCountriesForRegionalAccess: tempCountrySource });
  };

  handleChangeTOCL2 = (L1Index, e, data) => {
    // let myInterval2 = setInterval(() => {
      let L2Arr = [...this.state.tocArr];
      if (e == "" && L2Arr[L1Index]["toc_component"][data]) {
        L2Arr[L1Index]["toc_component"].splice(data, 1);
      } else {
        L2Arr[L1Index]["toc_component"][data] = {
          toc2_name: e,
          split: ["", ""],
          vsplit: ["", ""],
          toc2_component: [],
        };
      }
      this.setState({ tocArr: L2Arr })
      // this.setState({ tocArr: L2Arr }, () => {
      //   clearInterval(myInterval2);
      // });
    // }, 0);
  };
  
  handleChangeTOCL3 = (e, L2Index, L1Index, data) => {
    // let myInterval3 = setInterval(() => {
      let L3Arr = [...this.state.tocArr];
      if (
        e == "" &&
        L3Arr[L1Index]["toc_component"][L2Index]["toc2_component"][data]
      ) {
        L3Arr[L1Index]["toc_component"][L2Index]["toc2_component"].splice(
          data,
          1
        );
      } else {
        L3Arr[L1Index]["toc_component"][L2Index]["toc2_component"][data] = {
          toc3_name: e,
          split: ["", ""],
          vsplit: ["", ""],
          toc3_component: [],
        };
      }
      this.setState({ tocArr: L3Arr })
    //   this.setState({ tocArr: L3Arr }, () => {
    //     clearInterval(myInterval3);
    //   });
    // }, 0);
  };

  handleChangeTOCL4 = (e, L3Index, L2Index, L1Index, data) => {
    // let myInterval4 = setInterval(() => {
      let L4Arr = [...this.state.tocArr];
      if (
        e == "" &&
        L4Arr[L1Index]["toc_component"][L2Index]["toc2_component"][L3Index][
          "toc3_component"
        ][data]
      ) {
        L4Arr[L1Index]["toc_component"][L2Index]["toc2_component"][L3Index][
          "toc3_component"
        ].splice(data, 1);
      } else {
        L4Arr[L1Index]["toc_component"][L2Index]["toc2_component"][L3Index][
          "toc3_component"
        ][data] = {
          toc4_name: e,
          split: ["", ""],
          vsplit: ["", ""],
        };
      }
      this.setState({ tocArr: L4Arr })
    //   this.setState({ tocArr: L4Arr }, () => {
    //     clearInterval(myInterval4);
    //   });
    // }, 0);
  };

  handlePeriodSplit = (endYear) => {
    let periodSplit = {
      inputs: [{}],
    };
    for (let index = this.state.startYear; index < endYear + 1; index++) {
      periodSplit.inputs[0][index] = 0;
    }
    this.setState({ periodSplit });
    this.setState({ volumeSplit: periodSplit });
  };
  handleSelectRegion = (e, Region) => {
    let regionSplit = { ...this.state.multipleRegionSplit };
    if (e.target.checked) {
      regionSplit[Region] = {
        split: 0,
      };
    } else if (!e.target.checked) {
      delete regionSplit[Region];
    }
    this.setState({ multipleRegionSplit: regionSplit });
    if (Object.keys(regionSplit).length != this.state.countries.inputs.length) {
      let allCountries = { ...this.state.countries };
      for (let index = 0; index < allCountries.inputs.length; index++) {
        if (
          !Object.keys(regionSplit).includes(
            allCountries.inputs[index]["region"]
          )
        ) {
          allCountries.inputs.splice(index, 1);
        }
      }
      this.setState({ countries: allCountries });
    }
  };

  handleChangePeriodSplit = (elm, e) => {
    this.setState((prevState) => ({
      periodSplit: {
        ...prevState.periodSplit,
        inputs: prevState.periodSplit.inputs.map((item, i) =>
          0 === i
            ? {
                ...item,
                [elm]: e.target.value,
              }
            : item
        ),
      },
    }));
  };

  handleChangeVolumeSplit = (elm, e) => {
    this.setState((prevState) => ({
      volumeSplit: {
        ...prevState.volumeSplit,
        inputs: prevState.volumeSplit.inputs.map((item, i) =>
          0 === i
            ? {
                ...item,
                [elm]: e.target.value,
              }
            : item
        ),
      },
    }));
  };

  handleChangeTOCL1 = (data, e) => {
    // let myInterval = setInterval(() => {
      let L1Arr = this.state.tocArr;
      let tempL1Arr = () => {
        let temp;
        if (
          !(L1Arr[data] && L1Arr[data].length > 0 && L1Arr[data].toc_component)
        ) {
          temp = { toc_name: e, toc_component: [] };
          return temp;
        } else {
          temp = L1Arr[data];
        }
        return temp;
      };
      L1Arr[data] = tempL1Arr();
      for (let index = 0; index < L1Arr.length; index++) {
        if (L1Arr[index].toc_name.length == 0) {
          L1Arr.splice(index, 1);
        }
      }
      this.setState({ tocArr: L1Arr })
    //   this.setState({ tocArr: L1Arr }, () => {
    //     clearInterval(myInterval);
    //   });
    // }, 0);
  };

  handlePaste = (e) => {
    return parse(e);
  };

  handleChangeSplitRegion = (splitType, e, index) => {
    let tempRegionSplit = { ...this.state.countries };
    if (splitType == "startSplit") {
      tempRegionSplit.inputs[index]["split"][0] = e.target.value.split("%")[0];
    } else if (splitType == "endSplit") {
      tempRegionSplit.inputs[index]["split"][1] = e.target.value.split("%")[0];
    }
    this.setState({ countries: tempRegionSplit });
  };

  handleChangeSplitRegionwithvol = (splitType, e, index) => {
    let tempRegionSplit = { ...this.state.countries };
    if (splitType == "startSplit") {
      tempRegionSplit.inputs[index]["split"][0] = e.target.value.split("%")[0];
    } else if (splitType == "endSplit") {
      tempRegionSplit.inputs[index]["split"][1] = e.target.value.split("%")[0];
    }
    if (splitType == "vstartSplit") {
      tempRegionSplit.inputs[index]["vsplit"][0] = e.target.value.split("%")[0];
    } else if (splitType == "vendSplit") {
      tempRegionSplit.inputs[index]["vsplit"][1] = e.target.value.split("%")[0];
    }
    this.setState({ countries: tempRegionSplit });
  };

  handleChangeCountryPeriodSplit = (splitType, e, regionIndex, index) => {
    let tempCountry = { ...this.state.countries };
    tempCountry.inputs[regionIndex]["tocreg"][index] = {
      ...tempCountry.inputs[regionIndex]["tocreg"][index],
      split:
        tempCountry.inputs[regionIndex]["tocreg"][index] &&
        Object.keys(tempCountry.inputs[regionIndex]["tocreg"][index]).includes(
          "split"
        )
          ? [...tempCountry.inputs[regionIndex]["tocreg"][index]["split"]]
          : [],
    };
    if (splitType == "startSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["split"][0] =
        e.target.value.split("%")[0];
    }
    if (splitType == "endSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["split"][1] =
        e.target.value.split("%")[0];
    }
    this.setState({ countries: tempCountry });
  };
  
  handleChangeCountryPeriodSplitvol = (splitType, e, regionIndex, index) => {
    let tempCountry = { ...this.state.countries };
    tempCountry.inputs[regionIndex]["tocreg"][index] = {
      ...tempCountry.inputs[regionIndex]["tocreg"][index],
      split:
        tempCountry.inputs[regionIndex]["tocreg"][index] &&
        Object.keys(tempCountry.inputs[regionIndex]["tocreg"][index]).includes(
          "split"
        )
          ? [...tempCountry.inputs[regionIndex]["tocreg"][index]["split"]]
          : [],
    };
    tempCountry.inputs[regionIndex]["tocreg"][index] = {
      ...tempCountry.inputs[regionIndex]["tocreg"][index],
      vsplit:
        tempCountry.inputs[regionIndex]["tocreg"][index] &&
        Object.keys(tempCountry.inputs[regionIndex]["tocreg"][index]).includes(
          "vsplit"
        )
          ? [...tempCountry.inputs[regionIndex]["tocreg"][index]["vsplit"]]
          : [],
    };
    if (splitType == "startSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["split"][0] =
        e.target.value.split("%")[0];
    }
    if (splitType == "endSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["split"][1] =
        e.target.value.split("%")[0];
    }
    if (splitType == "vstartSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["vsplit"][0] =
        e.target.value.split("%")[0];
    }
    if (splitType == "vendSplit") {
      tempCountry.inputs[regionIndex]["tocreg"][index]["vsplit"][1] =
        e.target.value.split("%")[0];
    }
    this.setState({ countries: tempCountry });
  };
  handleChange = (event) => {
    this.setState({ tableSplit: event.target.checked });
  };

  roundToTwo = (num) => {
    return num ? +(Math.round(num + "e+2") + "e-2") : "";
  };

  render() {
    let {
      reportName,
      industry,
      startYear,
      endYear,
      yearRange,
      typeByValue,
      pageName,
      pageIndex,
      openDialog1,
      openDialog2,
      openDialog3,
      openDialog4,
      tocArr,
      forcast,
      geography,
      countries,
      periodSplit,
      multipleRegionSplit,
      selectedCountries,
      countryList,
      volumeSplit,
      typeByVolume,
      regionCountriesForRegionalAccess,
      selectedRegionForRegionalAccess,
      tocL1,
      endYearRange,
    } = this.state;
    
    // console.log("!!!!!!!!!!!!!!!!!")
    // console.log(JSON.stringify(this.state.multipleRegionSplit),"mult 656");
    // console.log(JSON.stringify(this.state.selectedDropCountries),"mult 657");
    // console.log("!!!!!!!!!!!!!!!!!")
    // console.log(JSON.stringify(this.state.regionCountriesForRegionalAccess),"mult 667");
    // console.log(JSON.stringify(this.state.selectedCountries),"mult 668");
    
    

    return (
      <React.Fragment>
        <ToastsContainer store={ToastsStore} position="top_center" />
        <div className="reportFieldsContainer">
          <Grid className="gridField">
            <TextField
              label="Report Name *"
              name="ReportName"
              value={reportName}
              onChange={(e) => this.setState({ reportName: e.target.value })}
              variant="outlined"
              placeholder="Enter Report Name"
              style={{ width: "20rem" }}
            />
            <TextField
              label="Industry *"
              name="Industry"
              value={industry}
              onChange={(e) => this.setState({ industry: e.target.value })}
              variant="outlined"
              placeholder="Enter Industry"
              style={{ width: "20rem" }}
            />
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "20rem" }}
            >
              <InputLabel id="demo-simple-select-label">
                Start Period *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={startYear}
                label="Start Period *"
                onChange={(e) => {
                  let endYearRange = [];
                  for (let index = 0; index < 20; index++) {
                    endYearRange.push(e.target.value + index + 1);
                  }
                  this.setState({
                    startYear: e.target.value,
                    endYearRange: endYearRange,
                  },() => {
                    if(this.state.endYear){
                      let periodSplit = {
                      inputs: [{}],
                    };
                    for (let index = this.state.startYear; index < endYear + 1; index++) {
                      periodSplit.inputs[0][index] = 0;
                    }
                    this.setState({ periodSplit });
                    this.setState({ volumeSplit: periodSplit });
                    }
                    
                  });
                }}
              >
                <MenuItem>Select Start Period</MenuItem>
                {yearRange &&
                  yearRange.length > 0 &&
                  yearRange.map((year, i) => {
                    return (
                      <MenuItem key={i} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "20rem" }}
            >
              <InputLabel id="demo-simple-select-label">
                End Period *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={endYear}
                label="End Period *"
                onChange={(e) => {
                  this.setState({
                    endYear: e.target.value,
                  });
                  this.handlePeriodSplit(e.target.value);
                }}
              >
                <MenuItem>Select End Period</MenuItem>
                {endYearRange &&
                  endYearRange.length > 0 &&
                  endYearRange.map((year, i) => {
                    return (
                      <MenuItem key={i} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid className="gridField">
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "20rem" }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Value Units
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeByValue ? typeByValue : ""}
                label="Select Value Units"
                onChange={(e) => this.setState({ typeByValue: e.target.value })}
              >
                <MenuItem value="">Select Value Units</MenuItem>
                <MenuItem value="Thousand USD">Thousand USD</MenuItem>
                <MenuItem value="Million USD">Million USD</MenuItem>
                <MenuItem value="Billion USD">Billion USD</MenuItem>
                <MenuItem value="Trillion USD">Trillion USD</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "20rem" }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Volume Units
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeByVolume ? typeByVolume : ""}
                label="Select Volume Units"
                onChange={(e) =>
                  this.setState({ typeByVolume: e.target.value })
                }
              >
                <MenuItem>Select Volume Units</MenuItem>
                <MenuItem value="Units">Units</MenuItem>
                <MenuItem value="Thousand Units">Thousand Units</MenuItem>
                <MenuItem value="Million Units">Million Units</MenuItem>
                <MenuItem value="Billion Units">Billion Units</MenuItem>
                <MenuItem value="Trillion Units">Trillion Units</MenuItem>
                <MenuItem value="Tons">Tons</MenuItem>
                <MenuItem value="Kilotons">Kilotons</MenuItem>
                <MenuItem value="Metric Tons">Metric Tons</MenuItem>
                <MenuItem value="Watt">Watt</MenuItem>
                <MenuItem value="kilowatt">kilowatt</MenuItem>
                <MenuItem value="Megawatt">Megawatt</MenuItem>
                <MenuItem value="Gigawatt">Gigawatt</MenuItem>
                <MenuItem value="Kilogram">Kilogram</MenuItem>
                <MenuItem value="Liters">Liters</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "20rem" }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Type of Report *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Geography *"
                value={geography}
                onChange={(e) => {
                  this.setState({ geography: e.target.value }, () => {
                    if (this.state.geography == "Country") {
                      axios
                        .get(`${API_URL}/api/countrylist/`, {
                          headers: {
                            Authorization: `Token ${sessionStorage.getItem(
                              "token"
                            )}`,
                          },
                        })
                        .then((res) => {
                          this.setState({ countryList: res.data });
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                  if (e.target.value == "Global") {
                    let regionSplit = { ...this.state.multipleRegionSplit };
                    let tempArr = { ...this.state.countries };
                    let selectedCountries = [];
                    for (
                      let index = 0;
                      index < this.state.country.length;
                      index++
                    ) {
                      let tocreg = [];
                      for (
                        let j = 0;
                        j < this.state.country[index].country.length;
                        j++
                      ) {
                        tocreg.push(this.state.country[index].country[j]);
                      }

                      regionSplit[this.state.country[index]["region"]] = {
                        split: 0,
                      };
                      //todo
                      selectedCountries.push({
                        region: this.state.country[index]["region"],
                        country: this.state.country[index]["country"],
                      });
                      tempArr.inputs.push({
                        region: this.state.country[index]["region"],
                        split: [],
                        vsplit: [],
                        tocreg: tocreg,
                      });
                    }
                    this.setState({
                      multipleRegionSplit: regionSplit,
                      countries: tempArr,
                      selectedDropCountries: selectedCountries,
                    });
                  }
                }}
                required
              >
                <MenuItem>Select Geography</MenuItem>
                <MenuItem value="Global">Global</MenuItem>
                <MenuItem value="Regional">Regional</MenuItem>
                <MenuItem value="Country">Country</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              sx={{ m: 1, minWidth: 120 }}
              style={{ width: "19rem" }}
              control={
                <Checkbox
                  checked={this.state.tableSplit}
                  onChange={this.handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Table Split"
            />
          </Grid>
          {pageName == "toc_Levels" && (
            <Grid>
              <Button
                variant="contained"
                onClick={() => this.setState({ openDialog1: true })}
                className="tocButton"
              >
                Enter TOC L1
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                onClick={() => {
                  this.setState({ openDialog2: true });
                }}
                className="tocButton"
              >
                Enter TOC L2
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                onClick={() => {
                  this.setState({ openDialog3: true });
                }}
                className="tocButton"
              >
                Enter TOC L3
              </Button>
              <br />
              <br />
              <Button
                variant="contained"
                onClick={() => {
                  this.setState({ openDialog4: true });
                }}
                className="tocButton"
              >
                Enter TOC L4
              </Button>
            </Grid>
          )}
          <br />
          {pageName == "toc_Levels" && (
            <React.Fragment>
              <Dialog
                open={openDialog1}
                onClose={() => this.setState({ openDialog1: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="tocDialog"
              >
                <DialogContent
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <table
                    className="table table-bordered toc"
                    style={{ maxWidth: "17rem" }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#b8b8b8" }}>
                        <th>TOC L1</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20,
                      ].map((data, i) => (
                        <tr key={data} className="tocRow">
                          <td style={{ textAlign: "left" }} className="tocData">
                            <span>
                              <input
                                type="text"
                                onInput={(e) => {
                                  this.handleChangeTOCL1(
                                    data - 1,
                                    e.target.value
                                  );
                                }}
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                                style={{ marginRight: "5px" }}
                                value={
                                  // this.props.editData ?
                                  // this.state.tocL1Value &&
                                  //   this.state.tocL1Value.length > 0 &&
                                  //   this.state.tocL1Value[i] &&
                                  //   this.state.tocL1Value[i].toc_name
                                  //   ? this.state.tocL1Value[i].toc_name
                                  //   : ""
                                  // :
                                  this.state.tocArr &&
                                  this.state.tocArr.length > 0 &&
                                  this.state.tocArr[i] &&
                                  this.state.tocArr[i].toc_name
                                    ? this.state.tocArr[i].toc_name
                                    : ""
                                }
                              ></input>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <CloseIcon
                    onClick={() => this.setState({ openDialog1: false })}
                  />
                </DialogContent>
              </Dialog>
              {
                <Dialog
                  open={openDialog2}
                  onClose={() => this.setState({ openDialog2: false })}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="tocDialog"
                >
                  <DialogContent
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {this.state.tocArr.map((L1, L1Index) => {
                      // let tempValue = [...this.state.tocL1Value][L1Index];
                      return (
                        <table
                          className="table table-bordered toc"
                          style={{ maxWidth: "17rem" }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#b8b8b8" }}>
                              <th>{L1.toc_name}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                              16, 17, 18, 19, 20,
                            ].map((data, i) => (
                              <tr key={data} className="tocRow">
                                <td
                                  style={{ textAlign: "left" }}
                                  className="tocData"
                                >
                                  <span>
                                    <input
                                      type="text"
                                      onInput={(e) => {
                                        this.handleChangeTOCL2(
                                          L1Index,
                                          e.target.value,
                                          data - 1
                                        );
                                      }}
                                      onPaste={(e) => {
                                        this.handlePaste(e);
                                      }}
                                      style={{ marginRight: "5px" }}
                                      value={
                                        // this.props.editData ?
                                        // tempValue["toc_component"] &&
                                        //   tempValue["toc_component"].length > 0 &&
                                        //   tempValue["toc_component"][i] &&
                                        //   tempValue["toc_component"][i]["toc2_name"]
                                        //   ? tempValue["toc_component"][i][
                                        //   "toc2_name"
                                        //   ]
                                        //   : ""
                                        // :
                                        L1["toc_component"] &&
                                        L1["toc_component"].length > 0 &&
                                        L1["toc_component"][i] &&
                                        L1["toc_component"][i]["toc2_name"]
                                          ? L1["toc_component"][i]["toc2_name"]
                                          : ""
                                      }
                                    ></input>
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    })}
                    <CloseIcon
                      onClick={() => this.setState({ openDialog2: false })}
                    />
                  </DialogContent>
                </Dialog>
              }
              {this.state.openDialog3 && (
                <Dialog
                  open={openDialog3}
                  onClose={() => this.setState({ openDialog3: false })}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="tocDialog"
                >
                  <DialogContent
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {tocArr.length > 0 &&
                      tocArr.map((L1, L1Index) => {
                        return (
                          tocArr[L1Index].toc_component.length > 0 &&
                          tocArr[L1Index].toc_component.map((L2, L2Index) => {
                            // let tempValue = [...this.state.tocL1Value][L1Index]?.toc2_component[L2Index];
                            return (
                              <table
                                className="table table-bordered toc"
                                style={{ maxWidth: "17rem" }}
                              >
                                <thead>
                                  <tr style={{ backgroundColor: "#b8b8b8" }}>
                                    <th>{L2.toc2_name}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                    14, 15, 16, 17, 18, 19, 20,
                                  ].map((data, i) => (
                                    <tr key={data} className="tocRow">
                                      <td
                                        style={{ textAlign: "left" }}
                                        className="tocData"
                                      >
                                        <span>
                                          <input
                                            type="text"
                                            onInput={(e) => {
                                              this.handleChangeTOCL3(
                                                e.target.value,
                                                L2Index,
                                                L1Index,
                                                data - 1
                                              );
                                            }}
                                            onPaste={(e) => {
                                              this.handlePaste(e);
                                            }}
                                            style={{ marginRight: "5px" }}
                                            value={
                                              // this.props.editData ?
                                              // tempValue["toc2_component"] &&
                                              //   tempValue["toc2_component"].length >
                                              //   0 &&
                                              //   tempValue["toc2_component"][i] &&
                                              //   tempValue["toc2_component"][i][
                                              //   "toc3_name"
                                              //   ]
                                              //   ? tempValue["toc2_component"][i][
                                              //   "toc3_name"
                                              //   ]
                                              //   : ""
                                              // :
                                              L2["toc2_component"] &&
                                              L2["toc2_component"].length > 0 &&
                                              L2["toc2_component"][i] &&
                                              L2["toc2_component"][i][
                                                "toc3_name"
                                              ]
                                                ? L2["toc2_component"][i][
                                                    "toc3_name"
                                                  ]
                                                : ""
                                            }
                                          ></input>
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            );
                          })
                        );
                      })}
                    <CloseIcon
                      onClick={() => this.setState({ openDialog3: false })}
                    />
                  </DialogContent>
                </Dialog>
              )}
              {this.state.openDialog4 && (
                <Dialog
                  open={openDialog4}
                  onClose={() => this.setState({ openDialog4: false })}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="tocDialog"
                >
                  <DialogContent
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                    }}
                  >
                    {tocArr.length > 0 &&
                      tocArr.map(
                        (L1, L1Index) =>
                          tocArr[L1Index].toc_component.length > 0 &&
                          tocArr[L1Index].toc_component.map(
                            (L2, L2Index) =>
                              tocArr[L1Index].toc_component[L2Index]
                                .toc2_component.length > 0 &&
                              tocArr[L1Index].toc_component[
                                L2Index
                              ].toc2_component.map((L3, L3Index) => (
                                <table
                                  className="table table-bordered toc"
                                  style={{ maxWidth: "17rem" }}
                                >
                                  <thead>
                                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                                      <th>{L3.toc3_name}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[
                                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                                    ].map((data, i) => (
                                      <tr key={data} className="tocRow">
                                        <td
                                          style={{ textAlign: "left" }}
                                          className="tocData"
                                        >
                                          <span>
                                            <input
                                              type="text"
                                              onInput={(e) => {
                                                this.handleChangeTOCL4(
                                                  e.target.value,
                                                  L3Index,
                                                  L2Index,
                                                  L1Index,
                                                  data - 1
                                                );
                                              }}
                                              onPaste={(e) => {
                                                this.handlePaste(e);
                                              }}
                                              style={{ marginRight: "5px" }}
                                              value={
                                                L3["toc3_component"] &&
                                                L3["toc3_component"].length >
                                                  0 &&
                                                L3["toc3_component"][i] &&
                                                L3["toc3_component"][i][
                                                  "toc4_name"
                                                ]
                                                  ? L3["toc3_component"][i][
                                                      "toc4_name"
                                                    ]
                                                  : ""
                                              }
                                            ></input>
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ))
                          )
                      )}
                    <CloseIcon
                      onClick={() => this.setState({ openDialog4: false })}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </React.Fragment>
          )}

          <Grid className="gridFieldTable">
            {pageName == "geography" && (
              <React.Fragment>
                {pageIndex == 0 && geography != "" && geography == "Global" && (
                  <table
                    className="table table-bordered"
                    style={{ maxWidth: "60rem", marginLeft: "auto" }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#b8b8b8" }}>
                        <th>Select Region</th>
                        <th>Select Countries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.country?.map((data, i) => {
                        let found = this.state.selectedDropCountries.find(
                          (e) => e.region == data.region
                        );
                        return (
                          <tr key={data.id}>
                            <td style={{ textAlign: "left" }}>
                              <span>
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    this.handleSelectRegion(e, data.region)
                                  }
                                  style={{ marginRight: "5px" }}
                                  checked={
                                    Object.keys(
                                      this.state.multipleRegionSplit
                                    ).includes(data.region)
                                      ? true
                                      : false
                                  }
                                  // checked={
                                  //   this.state.regiondet?.region.length > 0 &&
                                  // }
                                  // checked={

                                  // this.state.regiondet &&
                                  // Object.keys(
                                  // this.state.regiondet
                                  // ).includes(data.region)
                                  // ? true
                                  // : false
                                  // }
                                ></input>
                              </span>
                              {data.region}
                            </td>
                            <td>
                              <CreatableSelect
                                options={data.country}
                                isMulti
                                isClearable
                                value={found?.country}
                                onChange={(e) =>
                                  this.handleCountryChange(data.region, e)
                                }
                                isDisabled={
                                  Object.keys(multipleRegionSplit).includes(
                                    data.region
                                  )
                                    ? false
                                    : true
                                }
                                placeholder={`Select ${data.region}'s Countries`}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {geography != "" && geography == "Regional" && (
                  <React.Fragment>
                    <Grid className="gridField">
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">
                          Select Region
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Region"
                          value={selectedRegionForRegionalAccess}
                          onChange={(e) =>
                            this.handleselectedRegionCountries(e.target.value)
                          }
                        >
                          <MenuItem value={0}>Select Region</MenuItem>
                          {this.state.country?.map((data) => (
                            <MenuItem key={data.id} value={data.region}>
                              {data.region}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <CreatableSelect
                        options={
                          regionCountriesForRegionalAccess &&
                          regionCountriesForRegionalAccess.length > 0 &&
                          regionCountriesForRegionalAccess[0].country
                        }
                        isMulti
                        isClearable
                        style={{ width: "15rem" }}
                        placeholder="Select Country"
                        value={this.state.selectedCountries}
                        onChange={(e) => {
                          if (
                            regionCountriesForRegionalAccess &&
                            regionCountriesForRegionalAccess.length > 0
                          )
                            this.handleCountryChange(
                              regionCountriesForRegionalAccess[0].region,
                              e
                            );
                        }}
                        // value={selectedCountries}
                        isDisabled={
                          selectedRegionForRegionalAccess.length > 0
                            ? false
                            : true
                        }
                      />
                    </Grid>
                  </React.Fragment>
                )}
                {pageIndex == 0 &&
                  geography != "" &&
                  geography == "Country" && (
                    <CreatableSelect
                      options={countryList}
                      isClearable
                      value={this.state.selectedCountries}
                      onChange={(e) => this.handleCountryChange("country", e)}
                      placeholder="Select Country"
                    />
                  )}
              </React.Fragment>
            )}

            {pageName == "periodSplit" &&
              periodSplit &&
              typeByValue &&
              Object.keys(periodSplit).length > 0 && (
                <table
                  className="table table-bordered splitTable"
                  style={{
                    display: "initial",
                    marginLeft: "auto",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                      <th>Year</th>
                      {Object.keys(periodSplit.inputs[0]).map(
                        (period, index) => (
                          <th>{period}</th>
                        )
                      )}
                    </tr>
                    <tr>
                      <th>Value</th>
                      {Object.keys(periodSplit.inputs[0]).map(
                        (period, index) => (
                          <React.Fragment>
                            <td>
                              <input
                                style={{ maxWidth: "5rem" }}
                                onInput={(e) => {
                                  this.handleChangePeriodSplit(
                                    period,
                                    e,
                                    index
                                  );
                                }}
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                                value={
                                  Object.values(periodSplit.inputs[0])[index] !=
                                  0
                                    ? Object.values(periodSplit.inputs[0])[
                                        index
                                      ]
                                    : ""
                                }
                              />
                            </td>
                          </React.Fragment>
                        )
                      )}
                    </tr>
                  </thead>
                </table>
              )}

            {pageName == "volumeSplit" &&
              periodSplit &&
              typeByVolume &&
              Object.keys(periodSplit).length > 0 && (
                <table
                  className="table table-bordered splitTable"
                  style={{
                    display: "initial",
                    marginLeft: "auto",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                      <th>Year</th>
                      {Object.keys(periodSplit.inputs[0]).map(
                        (period, index) => (
                          <th>{period}</th>
                        )
                      )}
                    </tr>
                    <tr>
                      <th>{typeByVolume && "Volume"}</th>
                      {Object.keys(periodSplit.inputs[0]).map(
                        (period, index) => (
                          <React.Fragment>
                            <td>
                              <input
                                style={{ maxWidth: "5rem" }}
                                onInput={(e) => {
                                  this.handleChangeVolumeSplit(
                                    period,
                                    e,
                                    index
                                  );
                                }}
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                                value={
                                  Object.values(volumeSplit.inputs[0])[index] !=
                                  0
                                    ? Object.values(volumeSplit.inputs[0])[
                                        index
                                      ]
                                    : ""
                                }
                              />
                            </td>
                          </React.Fragment>
                        )
                      )}
                    </tr>
                  </thead>
                </table>
              )}
            {pageName == "regionSplit" &&
              multipleRegionSplit &&
              geography != "Country" && typeByValue && !typeByVolume&&
              Object.keys(multipleRegionSplit).length > 0 && 
              (
                <table
                  className="table table-bordered splitTable"
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                      <th>Region</th>
                      <th>Start Split(%)</th>
                      <th>End Split(%)</th>
                    </tr>
                    {Object.keys(multipleRegionSplit).map((region, index) => (
                      <tr key={index}>
                        <th>{region}</th>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegion(
                                "startSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.props.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][0]
                                : this.state.countries.inputs[index]["split"][0]
                            }
                          />
                        </td>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegion(
                                "endSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.state.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][1]
                                : this.state.countries.inputs[index]["split"][1]
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </thead>
                </table>
              )}
            {pageName == "regionSplit" &&
              multipleRegionSplit &&
              geography != "Country" && !typeByValue && typeByVolume&&
              Object.keys(multipleRegionSplit).length > 0 && 
              (
                <table
                  className="table table-bordered splitTable"
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                      <th>Region</th>
                      <th>Start Split(%)</th>
                      <th>End Split(%)</th>
                    </tr>
                    {Object.keys(multipleRegionSplit).map((region, index) => (
                      <tr key={index}>
                        <th>{region}</th>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegion(
                                "startSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.props.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][0]
                                : this.state.countries.inputs[index]["split"][0]
                            }
                          />
                        </td>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegion(
                                "endSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.state.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][1]
                                : this.state.countries.inputs[index]["split"][1]
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </thead>
                </table>
              )}
              {pageName == "regionSplit" &&
              multipleRegionSplit &&
              geography != "Country" && typeByValue && typeByVolume&&
              Object.keys(multipleRegionSplit).length > 0 && 
              (
                <table
                  // className="table table-bordered splitTable1"
                  style={{
                    margin :"auto",
                    marginLeft: "auto",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#b8b8b8" }}>
                      <th>Region</th>
                      <th>Start Split(value)</th>
                      <th>End Split(value)</th>
                      <th>Start Split(volume)</th>
                      <th>End Split(volume)</th>
                    </tr>
                    {Object.keys(multipleRegionSplit).map((region, index) => (
                      <tr key={index}>
                        <th>{region}</th>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegionwithvol(
                                "startSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.props.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][0]
                                : this.state.countries.inputs[index]["split"][0]
                            }
                          />
                        </td>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegionwithvol(
                                "endSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.state.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "split"
                                  ][1]
                                : this.state.countries.inputs[index]["split"][1]
                            }
                          />
                        </td>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegionwithvol(
                                "vstartSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.props.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "vsplit"
                                  ][0]
                                : this.state.countries.inputs[index]["vsplit"][0]
                            }
                          />
                        </td>
                        <td>
                          <input
                            max={100}
                            onInput={(e) => {
                              this.handleChangeSplitRegionwithvol(
                                "vendSplit",
                                e,
                                index
                              );
                            }}
                            onPaste={(e) => {
                              this.handlePaste(e);
                            }}
                            value={
                              this.state.editData
                                ? Object.values(multipleRegionSplit)[index][
                                    "vsplit"
                                  ][1]
                                : this.state.countries.inputs[index]["vsplit"][1]
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </thead>
                </table>
              )}

            {pageName == "countrySplit" &&
              countries.inputs.length > 0 &&typeByValue && !typeByVolume&&
              countries.inputs.map((data, regionIndex) => {
                let isNotValid =
                  this.state.validCountrySplit.includes(regionIndex);
                return (
                  <table
                    key={regionIndex}
                    className="table table-bordered splitTable"
                    style={{
                      marginLeft: "auto",
                      border: isNotValid
                        ? "2px solid red"
                        : "1px solid #dee2e6",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#b8b8b8" }}>
                        {geography != "Country" && <th>Region</th>}
                        <th colSpan={2}>{data.region}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Country</td>
                        <td>Start Split(%)</td>
                        <td>End Split(%)</td>
                        {/* <td>Assumed Val. CAGR(%)</td> */}
                      </tr>
                      {data.tocreg.map((country, index) => {
                        return (
                          <tr key={index}>
                            <td>{country.label}</td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplit(
                                    "startSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[0]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplit(
                                    "endSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[1]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}

            {pageName == "countrySplit" &&
              countries.inputs.length > 0 &&!typeByValue && typeByVolume&&
              countries.inputs.map((data, regionIndex) => {
                let isNotValid =
                  this.state.validCountrySplit.includes(regionIndex);
                return (
                  <table
                    key={regionIndex}
                    className="table table-bordered splitTable"
                    style={{
                      marginLeft: "auto",
                      border: isNotValid
                        ? "2px solid red"
                        : "1px solid #dee2e6",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#b8b8b8" }}>
                        {geography != "Country" && <th>Region</th>}
                        <th colSpan={2}>{data.region}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Country</td>
                        <td>Start Split(%)</td>
                        <td>End Split(%)</td>
                        {/* <td>Assumed Val. CAGR(%)</td> */}
                      </tr>
                      {data.tocreg.map((country, index) => {
                        return (
                          <tr key={index}>
                            <td>{country.label}</td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplit(
                                    "startSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[0]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplit(
                                    "endSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[1]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}

            {pageName == "countrySplit" &&
              countries.inputs.length > 0 &&typeByValue && typeByVolume&&
              countries.inputs.map((data, regionIndex) => {
                let isNotValid =
                  this.state.validCountrySplit.includes(regionIndex);
                return (
                  <table
                    key={regionIndex}
                    // className="table table-bordered splitTable1"
                    style={{
                      margin :"auto",
                      width: "-webkit-fill-available",

                      // marginLeft: "auto",
                      border: isNotValid
                        ? "2px solid red"
                        : "1px solid #dee2e6",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#b8b8b8" }}>
                        {geography != "Country" && <th>Region</th>}
                        <th colSpan={4}>{data.region}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Country</td>
                        <td>Start Split(value)</td>
                        <td>End Split(value)</td>
                        <td>Start Split(volume)</td>
                        <td>End Split(volume)</td>
                        {/* <td>Assumed Val. CAGR(%)</td> */}
                      </tr>
                      {data.tocreg.map((country, index) => {
                        return (
                          <tr key={index}>
                            <td>{country.label}</td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplitvol(
                                    "startSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[0]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplitvol(
                                    "endSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["split"] &&
                                  country.split[1]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplitvol(
                                    "vstartSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["vsplit"] &&
                                  country.vsplit[0]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                            <td>
                              <input
                                onInput={(e) => {
                                  this.handleChangeCountryPeriodSplitvol(
                                    "vendSplit",
                                    e,
                                    regionIndex,
                                    index
                                  );
                                }}
                                value={
                                  country &&
                                  country["vsplit"] &&
                                  country.vsplit[1]
                                }
                                onPaste={(e) => {
                                  this.handlePaste(e);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
            <div>
              {pageName == "toc_Levels" && (
                <Button
                  variant="contained"
                  style={{ marginTop: "2rem" }}
                  onClick={() => {
                    if (
                      reportName &&
                      startYear &&
                      endYear &&
                      industry &&
                      (typeByValue || typeByVolume) &&
                      geography &&
                      tocArr.length > 0
                    ) {
                      this.setState({ pageName: "geography" });
                    } else
                      ToastsStore.warning("Please enter all mandatory fields");
                  }}
                >
                  Submit Meta Data
                </Button>
              )}

              {pageName == "geography" && (
                <>
                  <Button
                    style={{ marginTop: "2rem", marginRight: "10px" }}
                    variant="contained"
                    onClick={() => {
                      this.setState({ pageName: "toc_Levels" });
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    style={{ marginTop: "2rem" }}
                    variant="contained"
                    onClick={() => {
                      let temp = countries.inputs[0]["tocreg"];
                      if (temp.length > 0 && typeByValue)
                        this.setState({ pageName: "periodSplit" });
                      else if (temp.length > 0 && typeByVolume)
                        this.setState({ pageName: "volumeSplit" });
                      else
                        ToastsStore.warning(
                          "Please enter all mandatory fields"
                        );
                    }}
                  >
                    Submit Geography
                  </Button>
                </>
              )}
              {pageName == "periodSplit" && typeByValue && (
                <>
                  <Button
                    style={{ marginTop: "2rem", marginRight: "10px" }}
                    variant="contained"
                    onClick={() => {
                      this.setState({ pageName: "geography" });
                  
                  }}
                >
                  Back
                </Button>
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  onClick={() => {
                    let temp = Object.values(periodSplit.inputs[0]);
                    let isZero = temp.filter((item) => item == 0);
                    if (isZero.length > 0) {
                      ToastsStore.warning(
                        "Please enter Value Units for every Year"
                      );
                      return;
                    }
                    if (typeByValue && typeByVolume)
                      this.setState({ pageName: "volumeSplit" });
                    else if (geography == "Global")
                      this.setState({ pageName: "regionSplit" });
                    else if (geography == "Regional")
                      this.setState({ pageName: "countrySplit" });
                    else {
                      this.handleSaveTocLevel();
                      this.setState({ pageName: "tocSplit" });
                    }
                  }}
                >
                  Submit Value Split
                </Button>
                </>
              )}
              {pageName == "volumeSplit" && (
                <>
                  <Button
                    style={{ marginTop: "2rem", marginRight: "10px" }}
                    variant="contained"
                    onClick={() => {
                      if (typeByValue && typeByVolume)
                        this.setState({ pageName: "periodSplit" });
                      else this.setState({ pageName: "geography" });
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    style={{ marginTop: "2rem" }}
                    variant="contained"
                    onClick={() => {
                      let temp = Object.values(volumeSplit.inputs[0]);
                      let isZero = temp.filter((item) => item == 0);
                      if (isZero.length > 0) {
                        ToastsStore.warning(
                          "Please enter all mandatory fields"
                        );
                        return;
                      }
                      if (geography == "Global")
                        this.setState({ pageName: "regionSplit" });
                      else if (geography == "Country") {
                        this.handleSaveTocLevel();
                        this.setState({ pageName: "tocSplit" });
                      } else if (geography == "Regional") {
                        this.setState({ pageName: "countrySplit" });
                      }
                    }}
                  >
                    Submit Volume data
                  </Button>
                </>
              )}
              {pageName == "regionSplit" && geography == "Global" && (
                <>
                  <Button
                  style={{ marginTop: "2rem", marginRight:"10px" }}
                  variant="contained"
                  onClick={() => {
                    if (typeByValue && typeByVolume)
                    this.setState({ pageName: "volumeSplit" });
                    else
                      this.setState({ pageName: "periodSplit" });
               
                  }}
                >
                  Back
                </Button>
                <Button
                  style={{ marginTop: "2rem" }}
                  variant="contained"
                  onClick={() => {
                    let totalStart = 0;
                    let totalEnd = 0;
                    for (
                      let index = 0;
                      index < countries.inputs.length;
                      index++
                    ) {
                      totalStart += this.roundToTwo(
                        parseFloat(countries.inputs[index]["split"][0])
                      );
                      totalEnd += this.roundToTwo(
                        parseFloat(countries.inputs[index]["split"][1])
                      );
                    }
                    if (
                      totalStart <= 100.1 &&
                      totalStart >= 99.9 &&
                      totalEnd <= 100.1 &&
                      totalEnd >= 99.9
                    )
                      this.setState({ pageName: "countrySplit" });
                    else
                      ToastsStore.warning(
                        "Please enter correct data start and end split total must be 100"
                      );
                  }}
                >
                  Submit Region Split
                </Button>
                </>
              )}

              {pageName == "countrySplit" && (
                <>
                  <Button
                    style={{ marginTop: "2rem", marginRight: "10px" }}
                    variant="contained"
                    onClick={() => {
                      if (geography == "Global")
                        this.setState({ pageName: "regionSplit" });
                      else if ((typeByValue && typeByVolume) || typeByVolume)
                        this.setState({ pageName: "volumeSplit" });
                      else this.setState({ pageName: "periodSplit" });
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    style={{ marginTop: "2rem" }}
                    variant="contained"
                    onClick={() => {
                      let totalStart = 0;
                      let totalEnd = 0;
                      let isNotValid = [];
                      let error = false;
                      for (
                        let index = 0;
                        index < countries.inputs.length;
                        index++
                      ) {
                        for (
                          let j = 0;
                          j < countries.inputs[index]["tocreg"].length;
                          j++
                        ) {
                          totalStart += this.roundToTwo(
                            parseFloat(
                              countries.inputs[index]["tocreg"][j]["split"][0]
                            )
                          );
                          totalEnd += this.roundToTwo(
                            parseFloat(
                              countries.inputs[index]["tocreg"][j]["split"][1]
                            )
                          );
                        }
                        if (
                          totalStart <= 100.1 &&
                          totalStart >= 99.9 &&
                          totalEnd <= 100.1 &&
                          totalEnd >= 99.9
                        )
                          error = false;
                        else {
                          isNotValid.push(index);
                          ToastsStore.warning(
                            "Please enter correct data start and end split total must be 100"
                          );
                          error = true;
                          this.setState({ validCountrySplit: isNotValid });
                          break;
                        }
                        totalEnd = 0;
                        totalStart = 0;
                      }
                      if (!error) {
                        this.setState({ pageName: "tocSplit" });
                        this.handleSaveTocLevel();
                      }
                      // else ToastsStore.warning("Please enter all mandatory fields");
                    }}
                  >
                    Submit Country Split
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </div>
        {pageName == "tocSplit" && forcast && (
          <>
            <Button
              // style={{ marginTop: "2rem", marginLeft:"65rem" }}
              className="back2Country"
              variant="contained"
              onClick={() => {
                if (geography != "Country")
                  this.setState({ pageName: "countrySplit" });
                else this.setState({ pageName: "regionSplit" });
              }}
            >
              Back to Country Split
            </Button>
            <InputForcast
              handleGetReportsList={this.props.handleGetReportsList}
              data={countries.inputs}
              isEditable={this.props.editData ? true : false}
              reportData={{
                reportname: reportName,
                base_year: startYear,
                endyear: endYear,
                industry: industry,
                geography: geography,
                market:
                  geography == "Regional"
                    ? selectedRegionForRegionalAccess
                    : this.props.editData && geography == "Country"
                    ? this.state.m1
                    :!(this.props.editData) && geography == "Country"
                    ? selectedCountries.value
                    : "Global",
                year: periodSplit.inputs[0],
                ASP: this.state.typeByVolume ? volumeSplit.inputs[0] : {},
                value: typeByValue ? true : false,
                volume: typeByVolume ? true : false,
                valueunit: typeByValue,
                volumeunit: typeByVolume,
                tablesplit: this.state.tableSplit,
              }}
              toc={countries.inputs}
            />
             <Button
              // style={{ marginTop: "2rem", marginLeft:"65rem" }}
              className="back2Country"
              variant="contained"
              onClick={() => {
                if (geography != "Country")
                  this.setState({ pageName: "countrySplit" });
                else this.setState({ pageName: "regionSplit" });
              }}
            >
              Back to Country Split
            </Button>
          </>
        )}
      </React.Fragment>
    );
  }
  
}
