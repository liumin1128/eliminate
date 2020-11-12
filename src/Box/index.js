import React, { useState, useEffect } from "react";
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

const WIDTH = 30;

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
        style: {
          width: WIDTH,
          height: WIDTH,
          left: i * WIDTH + "px",
          top: j * WIDTH + "px",
          //   backgroundColor: "aliceblue",
          backgroundImage: "url(./images/" + animal + ".svg)",
        },
      });
    }
  }

  return list;
}

export default () => {
  const m = 10;
  const n = 10;
  const [list, setList] = useState(initData(m, n));
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();

  function checkY(row) {
    let p = 0;
    let q = 0;
    let result = [];
    let current = list.find((i) => i.x === p && i.y === row);

    function loop() {
    //   console.log(p, q);

      let next = list.find((i) => i.x === q && i.y === row);

      if (current.animal === next.animal) {
      } else {
        // console.log("不一样");

        if (q - 1 - p > 1) {
        //   console.log("p:", p, "q:", q, current.animal, " - ", next.animal);

          for (let x = p; x <= q - 1; x++) {
            result.push([x, row]);
          }
        }
        p = q;
      }

      if (q === m - 1) {
        // console.log("final:", p, q);
        if (q - p > 1) {
        //   console.log("p:", p, "q:", q, current.animal, " - ", next.animal);
          for (let x = p; x <= q; x++) {
            result.push([x, row]);
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

    console.log("result", result);
  }

  function check() {
    checkY(0);
  }

  function change(s, f) {
    const idx = list.findIndex((i) => i.id === f.id);
    list[idx] = {
      ...f,
      x: s.x,
      y: s.y,
      style: {
        ...f.style,
        left: s.x * WIDTH + "px",
        top: s.y * WIDTH + "px",
      },
    };

    const jdx = list.findIndex((i) => i.id === s.id);
    list[jdx] = {
      ...s,
      x: f.x,
      y: f.y,
      style: {
        ...s.style,
        left: f.x * WIDTH + "px",
        top: f.y * WIDTH + "px",
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
      setFirst(null);
      check();
    }
  }

  useEffect(() => {
    check();
  }, []);

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
      {/* <button
        onClick={() => {
          test();
        }}
      >
        test
      </button> */}
    </div>
  );
};
