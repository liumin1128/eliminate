import flatten from "lodash/flatten";
import unionBy from "lodash/unionBy";
import { List } from "immutable";
import { Howl, Howler } from "howler";

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

function getRandomAnmal() {
  const list = [
    // "alligator",
    "chicken",
    "frog",
    // "mouse",
    "sea-lion",
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
    this.maxY = y;

    this.removeList = [];
    this.data = List(initData(x, y));
  }
  init = () => {
    Howler.volume(0.5);

    this.sound = {};

    ["d1", "d2", "keyboard"].map((i) => {
      this.sound[i] = new Howl({
        src: ["./audios/" + i + ".mp3"],
        onplayerror: function (err) {
          console.log("onplayerror", err);
          this.sound.once("unlock", function () {
            this.sound.play();
          });
        },
        volume: 0.5,
        onend: function () {
          console.log("Finished!");
        },
      });
    });
  };

  setCallback = (callback) => {
    this.callback = callback;
  };

  getData = () => {
    return this.data;
  };

  update = () => {
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
        console.log({ x, y, idx });
        return { x, y, idx };
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

    // console.log("00000");

    let removeList = [];
    // console.log(this);
    for (let i = 0; i < this.maxY; i++) {
      removeList.push(checkLine(this.data, i, "x"));
    }
    for (let i = 0; i < this.maxX; i++) {
      removeList.push(checkLine(this.data, i, "y"));
    }
    const s = flatten(removeList);
    const t = unionBy(s, (i) => i.idx);
    removeList = t;
    this.removeList = removeList;
    return removeList;
  }

  setRemoveStatus(status) {
    let temp = this.data;
    // console.log(this.removeList)
    this.removeList.map(({ idx }) => {
      temp = temp.setIn([idx, "status"], status);
    });
    this.data = temp;
  }

  setRemovePosition() {
    let temp = this.data;
    let sumMap = {};
    this.removeList.map(({ idx, x, y }) => {
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

    this.data = temp;

    console.log("this.data:", this.data);
  }

  getDownList() {
    let temp = this.data;
    for (let x = 0; x < this.maxX; x++) {
      let sum = 0;
      for (let y = -this.maxY; y < this.maxY; y++) {
        const idx = this.data.findIndex((i) => i.x === x && i.y === y);
        if (idx !== -1) {
          // console.log("getDownList: ", item.x, item.y);
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
    this.data = this.data
      .setIn([a, "x"], bx)
      .setIn([a, "y"], by)
      .setIn([b, "x"], ax)
      .setIn([b, "y"], ay);
  }

  click = async (o) => {
    this.sound["keyboard"].play();
    const selectIdx = this.data.findIndex((i) => i.select);
    const objIdx = this.data.findIndex((i) => i.x === o.x && i.y === o.y);
    console.log(selectIdx, objIdx);
    if (selectIdx != -1) {
      if (selectIdx === objIdx) {
        this.data = this.data.setIn([objIdx, "select"], false);
      } else {
        this.a2b(selectIdx, objIdx);
        this.data = this.data.setIn([selectIdx, "select"], false);
      }
      // setList(a2b(this.data, selectIdx, objIdx).setIn([selectIdx, "select"], false));
    } else {
      console.log("66666", selectIdx);
      this.data = this.data.setIn([objIdx, "select"], true);
    }
    this.update();
    this.checkStatus();
  };

  async checkStatus() {
    console.log("checkStatus");
    this.getRemoveList();
    console.log("this.removeList", this.removeList);
    if (this.removeList.length === 0) return; // 检查是否有需要更新的方块

    this.sound["d1"].play();

    this.setRemoveStatus("removing");
    this.update();

    await sleep(1000);
    this.setRemoveStatus("removed");
    this.update();
    await sleep(30);
    this.setRemovePosition();
    this.update();
    await sleep(30);
    this.setRemoveStatus("ok");
    this.update();
    this.removeList = [];
    await sleep(30);
    this.getDownList();
    this.update();
    await sleep(300);
    this.checkStatus();
  }
}

export default Gamer;
