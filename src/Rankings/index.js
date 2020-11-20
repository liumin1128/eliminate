import React, { useEffect, useState } from "react";
import get from "lodash/get";
import AV from "leancloud-storage";
import { getScoreList, getAroundScoreList } from "../utils/av";

function renderUser(user) {
  if (user.name) return user.name;
  // const list = ['不愿透露姓名的用户','神秘大侠', '佚名',""]
  return "神秘用户：" + user.id;
}

export default () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const user = AV.User.current();

  useEffect(async () => {
    const res = await getScoreList();
    const res2 = await getAroundScoreList();
    setData(res);
    setData2(res2 || []);
  }, []);

  console.log(data);
  console.log("data2: ", data2);

  return (
    <div>
      排行榜：
      <ul>
        {data.map((i) => {
          return (
            <li>
              第{i.rank + 1}名
              {get(user, "id") === get(i, "user.id") ? "(你)" : ""}{" "}
              {get(i, "user.attributes.nickname")} {i.value}
            </li>
          );
        })}
      </ul>
      <ul>
        {data2
          .filter((i) => {
            const uid = get(i, "user.id");
            const idx = data.findIndex((j) => get(j, "user.id") === uid);
            console.log(uid, idx);
            return idx === -1;
          })
          .map((i) => {
            // if(data.find(j => get(, "user.id")))
            return (
              <li>
                第{i.rank + 1}名
                {get(user, "id") === get(i, "user.id") ? "(你)" : ""}{" "}
                {get(i, "user.attributes.nickname")} {i.value}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
