import React, { useState, useEffect } from "react";
import cls from "classnames";
import flatten from "lodash/flatten";
import unionBy from "lodash/unionBy";
import { List } from "immutable";
import Gamer from "./game";
import "animate.css";
import "./index.css";

const WIDTH = 75;

const gamer = new Gamer(9, 9);

export default () => {
  const [list, setList] = useState(gamer.getData());
  useEffect(() => {
    gamer.setCallback(setList);
    gamer.checkStatus();
  }, []);

  function test(o) {
    gamer.click(o);
  }

  // console.log("list: ", list);

  return (
    <div className="list">
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
                // animate__tada: i.remove,
              },
            ])}
            key={i.id}
            style={{
              width: WIDTH,
              height: WIDTH,
              transform:
                "translate3d(" + i.x * WIDTH + "px," + i.y * WIDTH + "px,0)",
              // left: i.x * WIDTH + "px",
              // top: i.y * WIDTH + "px",
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
                width: WIDTH,
                height: WIDTH,
                backgroundImage: "url(./images/" + i.animal + ".svg)",
              }}
            >
              {/* {i.status + ":" + i.x + "," + i.y} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
