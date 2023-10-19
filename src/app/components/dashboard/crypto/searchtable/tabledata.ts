import { table } from "./tableType";


export const DATATABL: table[] = [
    {
      id: 1,
      name:'ADA',
      icon:"./assets//images/crypto-currencies/cardano.svg" ,
      lastprice:1547.68,
   marketcap:71418730,

      color:" btn-danger ",
      change:"-1.31%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50],

          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          },

        },
        xAxis: {
          show: false
      },
        datalabels:{
          enabled:false
        },
     grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }

    },
    {
       id:2,
      icon :"./assets/images/crypto-currencies/bitcoin.svg" ,
      name:"BTC",
      lastprice: 10512.00,
      marketcap:50191183730,
      color:" btn-success ",
      change:"+3.50%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }
    },
    {
      id:3,
      icon :"./assets/images/crypto-currencies/eos.svg",
      name:"EOS",
      lastprice:148.18,
     marketcap: 84449078,
      color:" btn-danger ",
      change:"-1.25%",

      chartOptions2: {


        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }
    },
    {
id:4,
   icon :"./assets//images/crypto-currencies/ethereum.svg",
      name:"ETH",
      lastprice: 425.29,
   marketcap: 548308110,
      color:" btn-success ",
      change:"+1.54%",

      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },

        },

      }
    },

    {
id:5,
   icon :"./assets/images/crypto-currencies/euro.svg",
      name:"EUR",
      lastprice: 647.222,
   marketcap:4881413815,
      color:" btn-success ",
      change:"+0.73%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }
    },
    {
      id:6,
   icon :"./assets/images/crypto-currencies/litecoin.svg" ,
      name:"LTC",
      lastprice: 3.34,
   marketcap: 7504100862,
      color:" btn-danger ",
      change:"-1.87%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }

    },
    {
      id:7,
   icon :"./assets/images//crypto-currencies/nem.svg" ,
      name:"NEM",
      lastprice: 1.467813,
   marketcap: 9358735080,
      color:" btn-success",
      change:"+3.67%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }
    },
    {
      id:8,
   icon :"./assets/images/crypto-currencies/neo.svg" ,
      name:"NEO",
      lastprice: 723.46,
   marketcap: 180767295,
      color:" btn-danger",
      change:"-2.12%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }

    },
    {
      id:9,
   icon :"./assets/images/crypto-currencies/monero.svg" ,
      name:"XMR",
      lastprice: 303.16,
   marketcap: 4778157522,
      color:"  btn-success",
      change:"+3.23%",

      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }
    },
    {
      id:9,
   icon :"./assets//images/crypto-currencies/ripple.svg",
      name:"XRP",
      lastprice: 1.2028,
   marketcap:66380043,
      color:" btn-success ",
      change:"+0.62%",
      chartOptions2: {
        series: [
          {
            name: "Desktops",
            data: [20, 141, 25, 130, 19, 82, 15, 91, 50]
          }
        ],
        chart: {
          height: 100,
          top:200,
          width: 300,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
          xaxis: {
            lines: {
              show: false  //or just here to disable only x axis grids
            }

           },
          yaxis: {
            lines: {
              show: false  //or just here to disable only y axis
             }
           },
        },

      }

    },

  ];
