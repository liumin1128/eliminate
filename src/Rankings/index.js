import React, { useEffect, useState } from "react";
import get from "lodash/get";
import AV from "leancloud-storage";
import { getScoreList, getAroundScoreList } from "../utils/av";
import "./index.css";

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
    const [res, res2] = await Promise.all([
      getScoreList(),
      getAroundScoreList(),
    ]);
    setData(res);
    setData2(res2 || []);
  }, []);

  return (
    <div className="container">
      <h3 className="title">排行榜：</h3>
      <ul className="ul">
        {data.map((i) => {
          return (
            <li key={get(i, "user.id")} className="li">
              <span className="rank">
                第{i.rank + 1}名
                {get(user, "id") === get(i, "user.id") ? "(你)" : ""}
              </span>
              <span className="name">{get(i, "user.attributes.nickname")}</span>
              <span className="value">{i.value}</span>
            </li>
          );
        })}

        <li className="li">
          <span className="rank">...</span>
          <span className="name"></span>
          <span className="value"></span>
        </li>
        {data2
          .filter((i) => {
            const uid = get(i, "user.id");
            const idx = data.findIndex((j) => get(j, "user.id") === uid);
            return idx === -1;
          })
          .map((i) => {
            return (
              <li key={get(i, "user.id")} className="li">
                <span className="rank">
                  第{i.rank + 1}名
                  {get(user, "id") === get(i, "user.id") ? "(你)" : ""}
                </span>
                <span className="name">
                  {get(i, "user.attributes.nickname")}
                </span>
                <span className="value">{i.value}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
