import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Spin, Typography } from "antd";
import "./styles.less";
import echarts from "echarts";
import { PoolInfo } from "../../models";
import { PoolIcon } from "../tokenIcon";
import { formatShortDate, getPoolName } from "../../utils/utils";
import { useConnectionConfig } from "../../utils/connection";
import { BONFIDA_POOL_INTERVAL } from "../../context/market";

export const VOLUME_API = "https://serum-api.bonfida.com/pools/volumes";
export const LIQUIDITY_API = "https://serum-api.bonfida.com/pools/liquidity";

const API_ENDPOINTS: EndpointOptions = {
  volume: VOLUME_API,
  liquidity: LIQUIDITY_API,
};
type EndpointOptions = {
  [key: string]: string;
};
interface VolumeData {
  volume: number;
  time: number;
}

interface LiquidityData {
  liquidityAinUsd: number;
  liquidityBinUsd: number;
  time: number;
}

export const PoolLineChart = React.memo(
  (props: {
    pool?: PoolInfo;
    limit?: number;
    api: string;
    chartName: string;
    current?: string;
    type?: string;
    getComputedData: (item: any) => Array<number>;
    getComputedTime: (item: any) => Array<string>;
  }) => {
    const { pool, api, limit, chartName, current } = props;
    const chartDiv = useRef<HTMLDivElement>(null);
    const echartsRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let apiFilter: string = "";
    let apiUrl: string = "";
    const bonfidaTimer = useRef<number>(0);
    if (pool) {
      const baseMintAddress = pool.pubkeys.holdingMints[0].toBase58();
      const quoteMintAddress = pool.pubkeys.holdingMints[1].toBase58();
      apiFilter = `?mintA=${baseMintAddress}&mintB=${quoteMintAddress}`;
    }
    apiUrl = API_ENDPOINTS[api];

    const bonfidaDataChartQuery = useCallback(async () => {
      try {
        const resp = await window.fetch(`${apiUrl}${apiFilter}`);
        const data = await resp.json();
        let finalData = data?.data || [];
        if (limit && finalData) {
          finalData = finalData.slice(0, limit);
        }
        updateChart(finalData);
      } catch {
        // ignore
      }
      bonfidaTimer.current = window.setTimeout(
        () => bonfidaDataChartQuery(),
        BONFIDA_POOL_INTERVAL
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount

    const updateChart = (data: any) => {
      setLoading(false);
      if (echartsRef.current) {
        echartsRef.current.setOption({
          textStyle: {
            color: "#fff",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            containLabel: true,
            left: 0,
            right: 0,
          },
          xAxis: [
            {
              inverse: true,
              type: "category",
              data: props.getComputedTime(data),
            },
          ],
          yAxis: [
            {
              type: "value",
              scale: true,
              splitLine: false,
            },
          ],
          series: [
            {
              type: `${props.type || "line"}`,
              data: props.getComputedData(data),
            },
          ],
        });
      }
    };
    useEffect(() => {
      if (chartDiv.current) {
        echartsRef.current = echarts.init(chartDiv.current);
      }
      bonfidaDataChartQuery();
      return () => {
        echartsRef.current.dispose();
        window.clearTimeout(bonfidaTimer.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount
    return (
      <>
        {loading && <Spin tip="Loading..." />}
        {!loading && (
          <Typography.Title level={4}>
            {chartName} {current || ""}
          </Typography.Title>
        )}
        <div ref={chartDiv} style={{ height: "250px", width: "100%" }} />
      </>
    );
  }
);

export const HistoricalVolume = React.memo(
  (props: { pool?: PoolInfo; current?: string }) => {
    const getComputedData = (data: VolumeData[]) => {
      return data.map((d) => d.volume);
    };
    const getComputedTime = (data: VolumeData[]) => {
      return data.map((d: any) => formatShortDate.format(new Date(d.time)));
    };
    let name: string = "Volume";
    if (props.current) {
      name = "Volume (24H)";
    }
    return (
      <PoolLineChart
        pool={props.pool}
        limit={props.pool ? 7 : 0}
        api="volume"
        type="bar"
        chartName={name}
        current={props.current}
        getComputedData={getComputedData}
        getComputedTime={getComputedTime}
      />
    );
  }
);

type GrupedData = {
  [key: number]: number;
};

export const HistoricalLiquidity = React.memo(
  (props: { pool?: PoolInfo; current?: string }) => {
    const groupByTime = (data: LiquidityData[]) => {
      const groupedData: GrupedData = {};
      for (const d of data) {
        if (!groupedData[d.time]) {
          groupedData[d.time] = 0;
        }
        groupedData[d.time] =
          groupedData[d.time] + d.liquidityAinUsd + d.liquidityBinUsd;
      }
      return groupedData;
    };
    const getComputedData = (data: LiquidityData[]) => {
      const groupedData = groupByTime(data);
      return Object.values(groupedData);
    };
    const getComputedTime = (data: LiquidityData[]) => {
      const groupedData = groupByTime(data);
      return Object.keys(groupedData).map((key) =>
        formatShortDate.format(new Date(parseInt(key)))
      );
    };
    let name: string = "Liquidity";
    if (props.current) {
      name = "Total Liquidity";
    }
    return (
      <PoolLineChart
        pool={props.pool}
        limit={props.pool ? 7 : 0}
        api="liquidity"
        type="line"
        chartName={name}
        current={props.current}
        getComputedData={getComputedData}
        getComputedTime={getComputedTime}
      />
    );
  }
);

export const HistoricalPoolData = React.memo((props: { pool: PoolInfo }) => {
  const { tokenMap } = useConnectionConfig();
  const pool = props.pool;
  const baseMintAddress = pool.pubkeys.holdingMints[0].toBase58();
  const quoteMintAddress = pool.pubkeys.holdingMints[1].toBase58();
  const name = getPoolName(tokenMap, pool);
  return (
    <Card
      className="pool-card"
      title={
        <>
          <PoolIcon
            mintA={baseMintAddress}
            mintB={quoteMintAddress}
            className="left-icon"
          />
          {name}
        </>
      }
    >
      <HistoricalLiquidity pool={pool} />
      <HistoricalVolume pool={pool} />
    </Card>
  );
});


export const PoolLineCharts = React.memo(
  (props: {
    pool?: PoolInfo;
    limit?: number;
    api: string;
    current?: string;
    type?: string;
    getComputedData:Array<number>;
    getComputedTime: Array<string>;
    handleVal?: object
  }) => {
    const { pool, api, limit, current } = props;
    const chartDiv = useRef<HTMLDivElement>(null);
    const echartsRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let apiFilter: string = "";
    let apiUrl: string = "";
    const bonfidaTimer = useRef<number>(0);
    if (pool) {
      const baseMintAddress = pool.pubkeys.holdingMints[0].toBase58();
      const quoteMintAddress = pool.pubkeys.holdingMints[1].toBase58();
      apiFilter = `?mintA=${baseMintAddress}&mintB=${quoteMintAddress}`;
    }
    apiUrl = API_ENDPOINTS[api];

    const bonfidaDataChartQuery = useCallback(async () => {
      try {
        const resp = await window.fetch(`${apiUrl}${apiFilter}`);
        const data = await resp.json();
        let finalData = data?.data || [];
        if (limit && finalData) {
          finalData = finalData.slice(0, limit);
        }
        updateChart(finalData);
      } catch {
        // ignore
      }
      bonfidaTimer.current = window.setTimeout(
        () => bonfidaDataChartQuery(),
        BONFIDA_POOL_INTERVAL
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount

    const updateChart = (data: any) => {
      setLoading(false);
      if (echartsRef.current) {
        echartsRef.current.setOption({
          grid: {
            top: "0.1%",
            left: "1%",
            right: "4%",
            bottom: "10%",
            containLabel: false
          },
          xAxis: [
            {
              type: "category",
              data: props.getComputedTime,
              axisTick:{       //y轴刻度线
                show:false
              },
              axisLine:{       //y轴
                show:false
              },
              axisLabel: {
                show: true,
                textStyle: {
                    color: '#DBDBDB',
                    fontSize:'16'
                }
              }
            },
          ],
          yAxis: {
            show:false,
            type: 'value',
          },
          tooltip: { 
              trigger: 'axis',
              formatter: function (param: any) {
                if (props.handleVal != undefined) {
                  // @ts-ignore
                  props.handleVal({name:param[0].name,value:param[0].value})
                }          
                return ;                
              }
          },
          textStyle: {
            color: "#fff",
          },
          series: [{
              data: props.getComputedData,
              type: 'line',
              showSymbol: false,
              smooth: true,
              itemStyle:{
                  normal:{
                    color:'#FFC000', //折点颜色
                    borderColor:"#FFC000",
                    lineStyle:{
                      color:'#FFC000', //折线颜色
                      }
                  }
            },
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(255,192,0,0.7)'
                  }, {
                      offset: 1,
                      color: 'rgba(255,192,0,0)'
                  }])
              },
          }]
        });
      }
    };
    useEffect(() => {
      if (chartDiv.current) {
        echartsRef.current = echarts.init(chartDiv.current);
      }
      bonfidaDataChartQuery();
      return () => {
        echartsRef.current.dispose();
        window.clearTimeout(bonfidaTimer.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount
    return (
      <>
        <div style={{display:'flex',justifyContent:'center'}}>{loading && <Spin tip="Loading..." />}</div>
        {!loading && (
          <Typography.Title level={4}>
             {""}
          </Typography.Title>
        )}
        <div ref={chartDiv} style={{ height: "200px", width: "100%" }} />
      </>
    );
  }
);
export const PoolBarCharts = React.memo(
  (props: {
    pool?: PoolInfo;
    limit?: number;
    api: string;
    current?: string;
    type?: string;
    getComputedData:Array<number>;
    getComputedTime: Array<string>;
    handleVal?: object
  }) => {
    const { pool, api, limit, current } = props;
    const chartDiv = useRef<HTMLDivElement>(null);
    const echartsRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let apiFilter: string = "";
    let apiUrl: string = "";
    const bonfidaTimer = useRef<number>(0);
    if (pool) {
      const baseMintAddress = pool.pubkeys.holdingMints[0].toBase58();
      const quoteMintAddress = pool.pubkeys.holdingMints[1].toBase58();
      apiFilter = `?mintA=${baseMintAddress}&mintB=${quoteMintAddress}`;
    }
    apiUrl = API_ENDPOINTS[api];

    const bonfidaDataChartQuery = useCallback(async () => {
      try {
        const resp = await window.fetch(`${apiUrl}${apiFilter}`);
        const data = await resp.json();
        let finalData = data?.data || [];
        if (limit && finalData) {
          finalData = finalData.slice(0, limit);
        }
        updateChart(finalData);
      } catch {
        // ignore
      }
      bonfidaTimer.current = window.setTimeout(
        () => bonfidaDataChartQuery(),
        BONFIDA_POOL_INTERVAL
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount

    const updateChart = (data: any) => {
      setLoading(false);
      if (echartsRef.current) {
        echartsRef.current.setOption({
          grid: {
            top: "0.1%",
            left: "1%",
            right: "4%",
            bottom: "10%",
            containLabel: false
          },
          xAxis: [
            {
              data: props.getComputedTime,
              type: 'category',
              axisTick:{       //y轴刻度线
                  show:false
                },
                axisLine:{       //y轴
                  show:false
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#DBDBDB',
                      fontSize:'16'
                  }
              },
            },
          ],
          yAxis: {
            show:false,
            type: 'value',
          },
          tooltip: { 
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (param: any) {
              if (props.handleVal != undefined) {
                // @ts-ignore
                props.handleVal({name:param[0].name,value:param[0].value})
              }          
              return ;                
            }
          },
          textStyle: {
            color: "#fff",
          },
          series: [{
              data: props.getComputedData,
              type: 'bar',
              itemStyle:{
                normal:{
                  color:'#0071ED'
                }
              },
          }]
        });
      }
    };
    useEffect(() => {
      if (chartDiv.current) {
        echartsRef.current = echarts.init(chartDiv.current);
      }
      bonfidaDataChartQuery();
      return () => {
        echartsRef.current.dispose();
        window.clearTimeout(bonfidaTimer.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // needs to only be called on mount an unmount
    return (
      <>
        <div style={{display:'flex',justifyContent:'center'}}>{loading && <Spin tip="Loading..." />}</div>
        {!loading && (
          <Typography.Title level={4}>
             {""}
          </Typography.Title>
        )}
        <div ref={chartDiv} style={{ height: "200px", width: "100%" }} />
      </>
    );
  }
);
export const TVLChart = React.memo(
  (props: { pool?: PoolInfo; current?: string }) => {
    // const getComputedData = (data: VolumeData[]) => {
    //   return data.map((d) => d.volume);
    // };
    // const getComputedTime = (data: VolumeData[]) => {
    //   return data.map((d: any) => formatShortDate.format(new Date(d.time)));
    // };
    const [chartsData, setChartsData] = useState({name:'1',value:820})
    const getComputedData:Array<number>=  [120, 200, 190, 183, 189, 170,178,174,176,180,182,175,157,180,143,145,167,145,176,145,178,178,198,178,134,123,100,134,145,134,155,176,145,178,34,23,45,56,65,123,27]
    const getComputedTime:Array<string> = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']
    const handleVal= function(value:any){
      setChartsData(value);
      console.log(value,'value')
    }
    return (
      <div className="chartsDiv">
        <p className="font7">TVL</p>
        <p className="font5">${chartsData?.value}</p>
        <p className="font6">{ chartsData?.name }</p>
        <div className="PoolLineCharts">
          <PoolLineCharts
            pool={props.pool}
            limit={props.pool ? 7 : 0}
            api="volume"
            type="bar"
            current={props.current}
            getComputedData={getComputedData}
            getComputedTime={getComputedTime}
            handleVal={handleVal}
          />
        </div>
      </div>
    );
  }
);
export const VolumeChart = React.memo(
  (props: { pool?: PoolInfo; current?: string }) => {
    const [chartsData, setChartsData] = useState({name:'Mon',value:820})
    const getComputedData:Array<number>=  [120, 200, 150, 80, 70, 110, 130,23,34,23,56,187,34,3,43,5,67,45,76,45,78,78,98,78,34,23,100,34,3,34,55,76,45,78,34,23,45,56,65,123,27]
    const getComputedTime:Array<string> = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']
    const handleVal= function(value:any){
      setChartsData(value);
      console.log(value,'value')
    }
    return (
      <div className="chartsDiv">
        <p className="font7">Volume 24H</p>
        <p className="font5">${chartsData?.value}</p>
        <p className="font6">{ chartsData?.name }</p>
        <div className="PoolLineCharts">
          <PoolBarCharts
            pool={props.pool}
            limit={props.pool ? 7 : 0}
            api="volume"
            type="bar"
            current={props.current}
            getComputedData={getComputedData}
            getComputedTime={getComputedTime}
            handleVal={handleVal}
          />
        </div>
      </div>
    );
  }
);