import React, { useState, useEffect } from "react";
import cls from "classnames";
import flatten from "lodash/flatten";
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

export default () => {
  const m = 5;
  const n = 5;
  const [list, setList] = useState(List(initData(m, n)));

  useEffect(() => {
    let removeList = [];
    for (let i = 0; i < n; i++) {
      removeList.push(checkX(list, i, "x"));
    }
    for (let i = 0; i < m; i++) {
      removeList.push(checkX(list, i, "y"));
    }
    removeList = flatten(removeList);

    let temp = list;
    removeList.map(([x, y]) => {
      const idx = list.findIndex((i) => i.x === x && i.y === y);
      temp = temp.setIn([idx, "remove"], true);
    });

    setList(temp);
  }, [list]);

  function checkX(list, row, type) {
    let p = 0;
    let q = 0;
    let result = [];

    const transXYMap = {
      x: "y",
      y: "x",
    };

    function getItem(data) {
      return list.find((i) => i[type] === data && i[transXYMap[type]] === row);
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

      console.log("current, next", current.animal, next.animal);
      if (current.animal !== next.animal) {
        if (q - 1 - p > 1) {
          for (let x = p; x <= q - 1; x++) {
            result.push(getValue(x));
          }
        }
        p = q;
      }

      if (q === m - 1) {
        if (q - p > 1) {
          for (let x = p; x <= q; x++) {
            result.push(getValue(x));
          }
        }
        return;
      }

      if (q < m - 1) {
        q += 1;
        current = next;
        loop();
        return;
      }
    }

    loop();

    return result;
  }

  function change(list, a, b) {
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
      setList(
        change(list, selectIdx, objIdx).setIn([selectIdx, "select"], false)
      );
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
          />
        );
      })}
    </div>
  );
};
