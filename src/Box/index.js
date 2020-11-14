import React, { useState, useEffect } from "react";
import cls from "classnames";
import flatten from "lodash/flatten";
import unionBy from "lodash/unionBy";
import { List } from "immutable";
import "./index.css";

export const randomString = (len = 32) => {
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

const sleep = (t) => new Promise((resolve, reject) => setTimeout(resolve, t));

const WIDTH = 100;

function getRandomAnmal() {
  const list = [
    // "alligator",
    "chicken",
    "frog",
    // "mouse",
    // "sea-lion",
    "bear",
    // "dog",
    // "hippo",
    // "owl",
    // "sheep",
    // "bull",
    // "duck",
    // "lion",
    // "panda",
    // "snake",
    // "cat",
    // "elephant",
    // "monkey",
    // "pig",
    // "tiger",
  ];

  const i = Math.floor(Math.random() * list.length);
  return list[i];
}

function initData(m, n) {
  const list = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const animal = getRandomAnmal();
      list.push({
        id: randomString(),
        x: i,
        y: j,
        animal,
        select: false,
      });
    }
  }

  return list;
}

class Gamer {
  constructor(x, y) {
    this.maxX = x;
    this.maxY = x;
    this.removeList = [];
    this.data = List(initData(x, y));
  }
  init = () => {};
  start = () => {
    this.checkStatus();
  };
  setCallback = (callback) => {
    this.callback = callback;
  };
  getData = () => {
    return this.data;
  };
  onChange = () => {
    this.callback(this.data);
  };
  getRemoveList() {
    const transXYMap = {
      x: "y",
      y: "x",
    };

    const transMaxXYMap = {
      x: this.maxX,
      y: this.maxY,
    };

    function checkLine(list, row, type) {
      let p = 0;
      let q = 0;
      let result = [];

      function getItem(data) {
        // console.log("getItem: ", list, type, data);
        return list.find(
          (i) => i[type] === data && i[transXYMap[type]] === row
        );
      }

      function getValue(value) {
        if (type === "x") {
          return [value, row];
        }
        if (type === "y") {
          return [row, value];
        }
      }

      let current = getItem(q);

      function loop() {
        let next = getItem(q);

        if (current.animal !== next.animal) {
          if (q - 1 - p > 1) {
            for (let x = p; x <= q - 1; x++) {
              result.push(getValue(x));
            }
          }
          p = q;
        }

        if (q === transMaxXYMap[type] - 1) {
          if (q - p > 1) {
            for (let x = p; x <= q; x++) {
              result.push(getValue(x));
            }
          }
          return;
        }

        if (q < transMaxXYMap[type] - 1) {
          q += 1;
          current = next;
          loop();
          return;
        }
      }

      loop();

      return result;
    }

    console.log("00000");

    let removeList = [];
    console.log(this);
    for (let i = 0; i < this.maxY; i++) {
      removeList.push(checkLine(this.data, i, "x"));
    }
    for (let i = 0; i < this.maxX; i++) {
      removeList.push(checkLine(this.data, i, "y"));
    }
    const s = flatten(removeList);
    const t = unionBy(s, (i) => i.join(","));
    removeList = t;
    this.removeList = removeList;
    return removeList;
  }

  setRemoveStatus() {
    let temp = this.data;
    this.removeList.map(([x, y]) => {
      const idx = this.data.findIndex((i) => i.x === x && i.y === y);
      temp = temp.setIn([idx, "remove"], true);
    });
    this.data = temp;
  }

  setRemovePosition() {
    let temp = this.data;
    let sumMap = {};
    this.removeList.map(([x, y]) => {
      const idx = this.data.findIndex((i) => i.x === x && i.y === y);
      if (sumMap[x] === undefined) {
        sumMap[x] = -1;
      } else {
        sumMap[x] = sumMap[x] - 1;
      }
      console.log(sumMap);
      temp = temp.setIn([idx, "y"], sumMap[x]);
      //   .setIn([idx, "animal"], getRandomAnmal());
    });
    this.data = temp;
  }

  async checkStatus() {
    await sleep(300);
    this.getRemoveList();
    await sleep(300);
    this.setRemoveStatus();
    await sleep(300);
    this.onChange();
    await sleep(300);
    this.setRemovePosition();
    await sleep(300);
    this.onChange();
    await sleep(300);
  }
}

const gamer = new Gamer(5, 5);

export default () => {
  const m = 5;
  const n = 5;

  const [list, setList] = useState(gamer.getData());
  useEffect(() => {
    gamer.setCallback(setList);
    gamer.start();
  }, []);

  function a2b(list, a, b) {
    const ax = list.getIn([a, "x"]);
    const ay = list.getIn([a, "y"]);
    const bx = list.getIn([b, "x"]);
    const by = list.getIn([b, "y"]);
    return list
      .setIn([a, "x"], bx)
      .setIn([a, "y"], by)
      .setIn([b, "x"], ax)
      .setIn([b, "y"], ay);
  }

  function test(o) {
    const selectIdx = list.findIndex((i) => i.select);
    const objIdx = list.findIndex((i) => i.x === o.x && i.y === o.y);
    if (selectIdx != -1) {
      setList(a2b(list, selectIdx, objIdx).setIn([selectIdx, "select"], false));
      // 重选
      //   setList(
      //     list.setIn([selectIdx, "select"], false).setIn([objIdx, "select"], true)
      //   );
    } else if (selectIdx === objIdx) {
      setList(list.setIn([objIdx, "select"], false));
    } else {
      setList(list.setIn([objIdx, "select"], true));
    }
  }

  console.log("list: ", list, JSON.stringify(list));

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
              {
                select: i.select,
                remove: i.remove,
              },
            ])}
            key={i.id}
            style={{
              width: WIDTH,
              height: WIDTH,
              left: i.x * WIDTH + "px",
              top: i.y * WIDTH + "px",
              backgroundImage: "url(./images/" + i.animal + ".svg)",
            }}
          >
            ({i.x},{i.y})
          </div>
        );
      })}
    </div>
  );
};
