import React, { useState, useEffect } from "react";
import get from "lodash/get";
import AV from "leancloud-storage";
import cls from "classnames";
import Swal from "sweetalert2";
import Rankings from "../Rankings";
import { updateScore, loginAnonymously } from "../utils/av";
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
    console.log(e)
    const element = e.changedTouches[0].target;
    const sx = parseInt(element.getAttribute("data-x"), 0);
    const sy = parseInt(element.getAttribute("data-y"), 0);
    // 获取触摸结束点相对于屏幕位置
    const px = e.changedTouches[0].pageX;
    const py = e.changedTouches[0].pageY;

    // 获取画布位置
    const rect = document.querySelector(".list").getBoundingClientRect();
    const rx = rect.x;
    const ry = rect.y;

    // 对比触摸点与画布位置获取坐标
    const ex = Math.floor((px - rx) / width);
    const ey = Math.floor((py - ry) / width);

    function e2f(n, m) {
      if(n > m) {
        return m + 1
      } else if(n < m) {
        return m - 1
      } else {
        return m
      }
    }

    console.log(sx, sy, e2f(ex, sx), e2f(ey, sy))

    gamer.touchMove(sx, sy, e2f(ex, sx), e2f(ey, sy));
  }

  function submitScoreWithSetNickname(score) {
    // return new Promise((resolve, reject) => {
    return Swal.fire({
      title: "Submit Your \nScore:  " + score,
      input: "text",
      imageUrl: "./images/cat.svg",
      imageWidth: 120,
      imageHeight: 120,
      inputAttributes: {
        autocapitalize: "off",
        placeholder: "nickname",
        required: true,
      },
      showCancelButton: true,
      confirmButtonText: "提交",
      cancelButtonText: "就不",
      showLoaderOnConfirm: true,
      // preConfirm: (value) => {
      //   if (!value) {
      //     alert("取个名字这么难吗！");
      //     return;
      //   }
      //   user.setUsername(value);
      //   user.setPassword("guest");
      //   user.set("nickname", value);

      //   user.signUp();

      //   console.log(value);
      //   resolve()
      // },
      // allowOutsideClick: () => !Swal.isLoading(),
    });
    // });
  }

  async function submitScore(score) {
    await updateScore(score);
    Swal.fire({
      title: "Game Over！\nScore: " + score,
      imageUrl: "./images/cat.svg",
      imageWidth: 120,
      imageHeight: 120,
      confirmButtonText: "好的!",
    });
  }

  async function handleGameOver(score = 0) {
    try {
      let user = AV.User.current();
      if (!user) {
        // await loginAnonymously();
        const { value, isConfirmed } = await submitScoreWithSetNickname(score);
        if (isConfirmed) {
          user = new AV.User();
          await user.setUsername(value);
          await user.setPassword("test123");
          await user.set("nickname", value);
          await user.signUp();
        }
      }
      await submitScore(score);
      setList(null);
    } catch (error) {
      console.log("err:", error);
    }

    return;
  }

  function start() {
    gamer.init({
      onDataChange: setList,
      onScoreChange: setScore,
      onTimeChange: setTime,
      onGameOver: handleGameOver,
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
                      width: width - 6,
                      height: width - 6,
                      backgroundImage: "url(./images/" + i.animal + ".svg)",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div>
            <Rankings />
          </div>
          <div className="start" onClick={start}>
            START
          </div>
        </div>
      )}
    </div>
  );
};
