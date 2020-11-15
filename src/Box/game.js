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
    "dog",
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
          this.sound.once("unlock", function () {
            this.sound.play();
          });
        },
        volume: 0.5,
        onend: function () {},
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

  async remove(removeList) {
    this.sound["d1"].play();

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
    const removeList = this.getRemoveList(this.data);
    if (removeList.length === 0) return; // 检查是否有需要更新的方块
    await this.remove(removeList);
  }
}

export default Gamer;
