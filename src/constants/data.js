export const data = [
  {
    id: 0,
    key: "",
    name: "Notebook 13",
    req_units: 205,
    weight: 2451,
    utility: 40,
  },
  {
    id: 1,
    key: "",
    name: "Notebook 14",
    req_units: 420,
    weight: 2978,
    utility: 35,
  },
  {
    id: 2,
    key: "",
    name: "Notebook Outdoor",
    req_units: 450,
    weight: 3625,
    utility: 80,
  },
  {
    id: 3,
    key: "",
    name: "Mobiltelefon Büro",
    req_units: 60,
    weight: 717,
    utility: 30,
  },
  {
    id: 4,
    key: "",
    name: "Mobiltelefon Outdoor",
    req_units: 157,
    weight: 988,
    utility: 60,
  },
  {
    id: 5,
    key: "",
    name: "Mobiltelefon Heavy",
    req_units: 220,
    weight: 1220,
    utility: 65,
  },
  {
    id: 6,
    key: "",
    name: "Tablet Büro klein",
    req_units: 620,
    weight: 1405,
    utility: 40,
  },
  {
    id: 7,
    key: "",
    name: "Tablet Büro groß",
    req_units: 250,
    weight: 1455,
    utility: 40,
  },
  {
    id: 8,
    key: "",
    name: "Tablet Outdoor klein",
    req_units: 540,
    weight: 1690,
    utility: 45,
  },
  {
    id: 9,
    key: "",
    name: "Tablet Outdoor groß",
    req_units: 370,
    weight: 1980,
    utility: 68,
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Hardware", width: 150 },
  {
    field: "req_units",
    headerName: "Needed req_units",
    type: "number",
    width: 120,
  },
  {
    field: "weight",
    headerName: "Weight (g)",
    type: "number",
    width: 120,
  },
  {
    field: "utility",
    headerName: "Utility (^)",
    type: "number",
    width: 120,
  },
  {
    field: "ratio1",
    headerName: "weight/utility ratio",
    description: "",
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${parseFloat(
        params.getValue("weight") / params.getValue("utility")
      ).toFixed(3)}`,
  },
  {
    field: "ratio2",
    headerName: "utility/weight ratio",
    description: "",
    sortable: false,
    width: 150,
    valueGetter: (params) =>
      `${parseFloat(
        params.getValue("utility") / params.getValue("weight")
      ).toFixed(3)}`,
  },
];

export const baseline = [
  {
    id: 0,
    name: "Transporter 1",
    add_weight: 1100000,
    driver: 72400,
    weight_left: 1027600,
    items: [],
    utility_sum: 0,
    weight_sum: 0,
  },
  {
    id: 1,
    name: "Transporter 2",
    add_weight: 1100000,
    driver: 85700,
    weight_left: 1014300,
    items: [],
    utility_sum: 0,
    weight_sum: 0,
  },
];
