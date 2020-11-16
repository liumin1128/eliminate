import React, { useState, useEffect } from "react";
import cls from "classnames";
import Gamer from "./game";
import "animate.css";
import "./index.css";

const m = 9;
const n = 9;

const gamer = new Gamer(m, n);

export default () => {
  const [list, setList] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {



    setWidth(document.querySelector(".root").offsetWidth / m);
  }, []);

  function handleClick(o) {
    gamer.click(o);
  }

  function handleTouchStart(e) {
    e.preventDefault();
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    const element = e.changedTouches[0].target
    const sx = parseInt(element.getAttribute("data-x"),0)
    const sy = parseInt(element.getAttribute("data-y"),0)
    // 获取触摸结束点相对于屏幕位置
    const px= e.changedTouches[0].pageX
    const py= e.changedTouches[0].pageY

    // 获取画布位置
    const rect = document.querySelector(".list").getBoundingClientRect()
    const rx = rect.x 
    const ry = rect.y

    // 对比触摸点与画布位置获取坐标
    const ex = Math.floor((px - rx) / width)
    const ey = Math.floor((py - ry) / width)

    gamer.touchMove(sx,sy,ex,ey)

  }

  function start() {
    gamer.init({
      onDataChange: setList,
      onScoreChange: setScore,
      onTimeChange: setTime,
    });
  }

  return (
    <div className="root">
      {list ? (
        <>
          <div className="header">
            <h1>Score: {score}</h1>
            <h1>Time: {time / 1000}</h1>
          </div>

          <div
            className="list"
            onTouchEnd={handleTouchEnd}
            style={{ paddingTop: (n / m) * 100 + "%" }}
          >
            {list.map((i) => {
              return (
                <div
                  onClick={() => {
                    handleClick(i);
                  }}
                  className={cls([
                    "item",
                    {
                      select: i.select,
                      removed: i.status === "removed",
                      removing: i.status === "removing",
                    },
                  ])}
                  key={i.id}
                  style={{
                    width: width,
                    height: width,
                    transform:
                      "translate3d(" +
                      i.x * width +
                      "px," +
                      i.y * width +
                      "px,0)",
                  }}
                >
                  <div
                    data-x={i.x}
                    data-y={i.y}
                    className={cls([
                      "icon",
                      "animate__animated",
                      {
                        animate__tada: i.status === "removing",
                      },
                    ])}
                    key={i.id}
                    style={{
                      width: width,
                      height: width,
                      backgroundImage: "url(./images/" + i.animal + ".svg)",
                    }}
                  >
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div></div>
          <div className="start" onClick={start}>
            START
          </div>
        </div>
      )}
    </div>
  );
};
