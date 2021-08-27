import React, { useCallback, useEffect, useRef, useState } from "react";
import { Spin, Typography } from "antd";
import "./styles.less";
import echarts from "echarts";
import { PoolInfo } from "../../models";
import { BONFIDA_POOL_INTERVAL } from "../../context/market";

interface VolumeData {
  volume: number;
  time: number;
}

interface LiquidityData {
  liquidityAinUsd: number;
  liquidityBinUsd: number;
  time: number;
}



export const PoolLineCharts = React.memo(
  (props: {
    getComputedData:Array<number>;
    getComputedTime: Array<string>;
    loading: boolean;
    handleVal?: object
  }) => {
    const chartDiv = useRef<HTMLDivElement>(null);
    const echartsRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const updateChart = () => {
      setLoading(props.loading);
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
      updateChart()
      return () => {
        echartsRef.current.dispose();
      };
    }, [props.getComputedData,props.getComputedTime,props.loading]);
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
    getComputedData:Array<number>;
    getComputedTime: Array<string>;
    loading: boolean;
    handleVal?: object
  }) => {
    const chartDiv = useRef<HTMLDivElement>(null);
    const echartsRef = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const updateChart = () => {
      setLoading(props.loading);
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
      updateChart()
      return () => {
        echartsRef.current.dispose();
      };
    }, [props.getComputedData,props.getComputedTime,props.loading]); 
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
  (props: { time: any, data:any, loading:boolean }) => {
    const [chartsData, setChartsData] = useState({name:props.time[0],value:props.data[0]})
    const getComputedData:Array<number>=  [120, 200, 190, 183, 189, 170,178,174,176,180,182,175,157,180,143,145,167,145,176,145,178,178,198,178,134,123,100,134,145,134,155,176,145,178,34,23,45,56,65,123,27]
    const getComputedTime:Array<string> = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']
    const handleVal= function(value:any){
      setChartsData(value);
      console.log(value,'value')
    }
    useEffect(() => {
      setChartsData({name:props.time[0],value:props.data[0]})
    },[props.time,props.data]);
    return (
      <div className="chartsDiv">
        <p className="font7">TVL</p>
        <p className="font5">${chartsData.value}</p>
        <p className="font6">{ chartsData.name }</p>
        <div className="PoolLineCharts">
          <PoolLineCharts
            getComputedData={props.data}
            getComputedTime={props.time}
            loading={props.loading}
            handleVal={handleVal}
          />
        </div>
      </div>
    );
  }
);
export const VolumeChart = React.memo(
  (props: { time: any, data:any, loading:boolean }) => {
    const [chartsData, setChartsData] = useState({name:props.time[0],value:props.data[0]})
    const handleVal= function(value:any){
      setChartsData(value);
      console.log(value,'value')
    }
    useEffect(() => {
      setChartsData({name:props.time[0],value:props.data[0]})
    },[props.time,props.data]);
    return (
      <div className="chartsDiv">
        <p className="font7">Volume 24H</p>
        <p className="font5">${chartsData?.value}</p>
        <p className="font6">{ chartsData?.name }</p>
        <div className="PoolLineCharts">
          <PoolBarCharts
            getComputedData={props.data}
            getComputedTime={props.time}
            loading={props.loading}
            handleVal={handleVal}
          />
        </div>
      </div>
    );
  }
);