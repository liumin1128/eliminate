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

export const sleep = (t) =>
  new Promise((resolve, reject) => setTimeout(resolve, t));

export function getRandomAnmal() {
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

export function initData(m, n) {
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
