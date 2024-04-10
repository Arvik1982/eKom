import { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import getDataFormat from "./getDataFormat";
import { dataArray } from "../../data/data";

function Chart() {
  // Define data

  const [dataArr, setDataArr] = useState([{}]);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    const myTheme = am5.Theme.new(root);

    // Move minor label a bit down

    myTheme.rule("AxisLabel", ["minor"]).setAll({
      dy: 1,
    });

    // Tweak minor grid opacity

    myTheme.rule("Grid", ["minor"]).setAll({
      strokeOpacity: 0.08,
    });

    // Set themes

    root.setThemes([am5themes_Animated.new(root), myTheme]);

    // Create chart

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
      })
    );

    // Create Y-axis

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 10,
          minorLabelsEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.set("minorDateFormats", {
      day: "dd",
      month: "MM",
    });

    // Create series

    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // BackGround under the line

    series.strokes.template.setAll({
      strokeWidth: 3,
    });
    series.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
    });

    // Send Data to series

    series.data.setAll(dataArr);

    // Actual bullet

    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    // Add scrollbar

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    // Add cursor

    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomX",
      })
    );
    cursor.lineY.set("visible", false);

    return () => {
      root.dispose();
    };
  }, [dataArr]);

  useEffect(() => {
    // Define data

    setDataArr(getDataFormat(dataArray));
  }, []);

  return (
    <>
      <div id="chartdiv" style={{ width: "1500px", height: "1000px" }}></div>
      <button
        onClick={() => {
          setDataArr(getDataFormat(dataArray));
        }}
      >
        Обновить
      </button>
    </>
  );
}
export default Chart;
