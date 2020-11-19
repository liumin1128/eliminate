import React, { useEffect, useState } from "react";
import { getScoreList } from "../utils/av";

export default () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await getScoreList();
    setData(res);
  }, []);

  return (
    <ol>
      {data.map((i) => {
        return (
          <li>
            {i.user.objectId} {i.value}
          </li>
        );
      })}
    </ol>
  );
};
