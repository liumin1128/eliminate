import React, { useState } from "react";
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

function getRandomAnmal() {
  const list = [
    // "alligator",
    // "chicken",
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
    "cat",
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
        style: {
          left: i * 100 + "px",
          top: j * 100 + "px",
          //   backgroundColor: "aliceblue",
          backgroundImage: "url(./images/" + animal + ".svg)",
        },
      });
    }
  }

  return list;
}

export default () => {
  const [list, setList] = useState(initData(5, 5));
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();

  function moveTo(o, x, y) {
    const idx = list.findIndex((i) => i.id === o.id);
    list[idx] = {
      ...o,
      x: x,
      y: y,
      style: {
        ...o.style,
        left: x * 100 + "px",
        top: y * 100 + "px",
      },
    };
    setList([...list]);
  }

  function change(s, f) {
    const idx = list.findIndex((i) => i.id === f.id);
    list[idx] = {
      ...f,
      x: s.x,
      y: s.y,
      style: {
        ...f.style,
        left: s.x * 100 + "px",
        top: s.y * 100 + "px",
      },
    };

    const jdx = list.findIndex((i) => i.id === s.id);
    list[jdx] = {
      ...s,
      x: f.x,
      y: f.y,
      style: {
        ...s.style,
        left: f.x * 100 + "px",
        top: f.y * 100 + "px",
      },
    };

    setList([...list]);
  }

  function test(o) {
    console.log(o);
    if (!first) {
      setFirst(o);
    } else if (o.id !== first.id) {
      change(first, o);
      setFirst(null)
    }
  }

  console.log(list);
  return (
    <div className="list">
      {list.map((i) => {
        return (
          <div
            onClick={() => {
              test(i);
            }}
            className={
              "item" +
              (first && i.id === first.id ? " first" : "") +
              (second && i.id === second.id ? " second" : "")
            }
            key={i.id}
            style={i.style}
          />
        );
      })}
      <button
        onClick={() => {
          test();
        }}
      >
        test
      </button>
    </div>
  );
};
