import React, { useState, useEffect } from "react";
import cls from "classnames";
import flatten from "lodash/flatten";
import unionBy from "lodash/unionBy";
import { List } from "immutable";
import Gamer from "./game";
import "animate.css";
import "./index.css";

const m = 5;
const n = 7;

const gamer = new Gamer(m, n);

export default () => {
  const [list, setList] = useState(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(document.querySelector(".root").offsetWidth / m);
  }, []);

  function test(o) {
    gamer.click(o);
  }

  function start() {
    gamer.setCallback(setList);
    gamer.init();
    gamer.checkStatus();
  }

  return (
    <div className="root">
      {list ? (
        <div className="list" style={{ paddingTop: (n / m) * 100 + "%" }}>
          {list.map((i) => {
            return (
              <div
                onClick={() => {
                  test(i);
                }}
                className={cls([
                  "item",
                  // "animate__animated",
                  {
                    select: i.select,
                    removed: i.status === "removed",
                    removing: i.status === "removing",
                    // animate__tada: i.remove,
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
                  // left: i.x * width + "px",
                  // top: i.y * width + "px",
                  // backgroundImage: "url(./images/" + i.animal + ".svg)",
                }}
              >
                <div
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
                  {/* {i.status + ":" + i.x + "," + i.y} */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <button onClick={start}>start</button>
      )}
    </div>
  );
};
