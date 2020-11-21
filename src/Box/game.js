import flatten from "lodash/flatten";
import unionBy from "lodash/unionBy";
import get from "lodash/get";
import { List } from "immutable";
import { Howl, Howler } from "howler";
// import { updateScore } from "../utils/av";
import { randomString, sleep, getRandomAnmal, initData } from "../utils/common";

class Gamer {
  constructor(x, y) {
    this.maxX = x;
    this.maxY = y;
  }

  start() {
    this.status = "playing";
    this.score = 0;
    this.combo = 1;
    this.time = 3000000;
    this.data = List(initData(this.maxX, this.maxY));

    this.onDataChange(this.data);
    this.onScoreChange(this.score);
    this.onTimeChange(this.time);
    this.checkStatus();
    this.timeLoop();
  }

  init = ({ onDataChange, onScoreChange, onTimeChange, onGameOver }) => {
    Howler.volume(0.5);

    this.sound = {};

    ["d1", "d2", "keyboard"].map((i) => {
      this.sound[i] = new Howl({
        src: ["./audios/" + i + ".mp3"],
        onplayerror: function (err) {
          this.sound.once("unlock", function () {
            this.sound.play();
          });
        },
        volume: 0.5,
        onend: function () {},
      });
    });

    this.onDataChange = onDataChange;
    this.onScoreChange = onScoreChange;
    this.onTimeChange = onTimeChange;
    this.onGameOver = onGameOver;

    this.start();
  };

  timeLoop = () => {
    if (this.time > 0) {
      this.time = this.time - 1000;
      this.onTimeChange(this.time);
      setTimeout(() => {
        this.timeLoop();
      }, 1000);
    } else {
      this.status = "end";
      this.onGameOver(this.score);
      // alert("game over, socre:" + this.score);
      // this.start();
    }
  };

  getData = () => {
    return this.data;
  };

  update = () => {
    this.onDataChange(this.data);
  };

  getRemoveList(data) {
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
        const item = list.find(
          (i) => i[type] === data && i[transXYMap[type]] === row
        );

        return item;
      }

      function getValue(value) {
        let x;
        let y;
        let idx;
        if (type === "x") {
          x = value;
          y = row;
        }
        if (type === "y") {
          x = row;
          y = value;
        }
        idx = list.findIndex((i) => i.x === x && i.y === y);
        return { x, y, idx };
      }

      let current;

      function loop() {
        let next = getItem(q);

        if (!next) {
          current = null;
          if (q < transMaxXYMap[type] - 1) {
            q += 1;
            loop();
            return;
          }
        }

        if (!current) {
          current = next;
        }

        if (get(current, "animal") !== get(next, "animal")) {
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

    let removeList = [];
    for (let i = 0; i < this.maxY; i++) {
      removeList.push(checkLine(data, i, "x"));
    }
    for (let i = 0; i < this.maxX; i++) {
      removeList.push(checkLine(data, i, "y"));
    }
    const s = flatten(removeList);
    const t = unionBy(s, (i) => i.idx);
    removeList = t;
    return removeList;
  }

  setRemoveStatus(removeList, status) {
    let temp = this.data;
    removeList.map(({ idx }) => {
      temp = temp.setIn([idx, "status"], status);
    });
    return temp;
  }

  setRemovePosition(removeList) {
    let temp = this.data;
    let sumMap = {};
    removeList.map(({ idx, x, y }) => {
      if (sumMap[x] === undefined) {
        sumMap[x] = -1;
      } else {
        sumMap[x] = sumMap[x] - 1;
      }
      temp = temp
        .setIn([idx, "y"], sumMap[x])
        // .setIn([idx, "remove"], false)
        .setIn([idx, "animal"], getRandomAnmal());
    });
    return temp;
  }

  getDownList() {
    let temp = this.data;
    for (let x = 0; x < this.maxX; x++) {
      let sum = 0;
      for (let y = -this.maxY; y < this.maxY; y++) {
        const idx = this.data.findIndex((i) => i.x === x && i.y === y);
        if (idx !== -1) {
          temp = temp.setIn([idx, "y"], sum);
          sum++;
        }
      }
    }
    this.data = temp;
  }

  a2b(a, b) {
    const ax = this.data.getIn([a, "x"]);
    const ay = this.data.getIn([a, "y"]);
    const bx = this.data.getIn([b, "x"]);
    const by = this.data.getIn([b, "y"]);

    // 如果不是水平方向平移一位
    if (Math.abs(ax - bx) + Math.abs(ay - by) != 1) {
      return;
    }

    const temp = this.data
      .setIn([a, "x"], bx)
      .setIn([a, "y"], by)
      .setIn([b, "x"], ax)
      .setIn([b, "y"], ay);

    const removeList = this.getRemoveList(temp);
    if (removeList.length > 0) {
      this.data = temp;
      this.remove(removeList);
    }
  }

  click = async (o) => {
    console.log("this.status: ", this.status);
    if (this.status !== "playing") {
      return;
    }

    this.sound["keyboard"].play();

    const selectIdx = this.data.findIndex((i) => i.select);
    const objIdx = this.data.findIndex((i) => i.x === o.x && i.y === o.y);
    if (selectIdx != -1) {
      if (selectIdx === objIdx) {
        this.data = this.data.setIn([objIdx, "select"], false);
      } else {
        this.a2b(selectIdx, objIdx);
        this.data = this.data.setIn([selectIdx, "select"], false);
      }
      // setList(a2b(this.data, selectIdx, objIdx).setIn([selectIdx, "select"], false));
    } else {
      this.data = this.data.setIn([objIdx, "select"], true);
    }
    this.update();
    // this.checkStatus();
  };

  touchMove = async (sx, sy, ex, ey) => {
    console.log("this.status: ", this.status);

    if (this.status !== "playing") {
      return;
    }
    const sId = this.data.findIndex((i) => i.x === sx && i.y === sy);
    const eId = this.data.findIndex((i) => i.x === ex && i.y === ey);

    this.a2b(sId, eId);
    this.update();
  };

  async remove(removeList) {
    this.sound["d1"].play();

    this.score = this.score + removeList.length * this.combo * 100;
    this.onScoreChange(this.score);
    this.time = this.time + 1000;
    if (this.time > 30000) {
      this.time = 30000;
    }
    this.onTimeChange(this.time);

    this.data = this.setRemoveStatus(removeList, "removing");
    this.update();

    await sleep(1000);
    this.data = this.setRemoveStatus(removeList, "removed");
    this.update();

    await sleep(30);
    this.data = this.setRemovePosition(removeList);
    this.update();

    await sleep(30);
    this.data = this.setRemoveStatus(removeList, "ok");
    this.update();

    await sleep(30);
    this.getDownList();
    this.update();

    await sleep(300);
    this.checkStatus();
  }

  async checkStatus() {
    if (this.status === "end") {
      return;
    }

    const removeList = this.getRemoveList(this.data);

    // 重新计算移除组
    if (removeList.length === 0) {
      // 重置连击数
      this.combo = 1;
      this.status = "playing";
      return;
    }

    this.status = "moving";

    // 累计连击数
    this.combo = this.combo + 1;
    await this.remove(removeList);
  }
}

export default Gamer;
