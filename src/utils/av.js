import AV from "leancloud-storage";
import { randomString } from "./common";

AV.init({
  appId: "GmXQQSUuhWfw5bhp0cfmOzkY-gzGzoHsz",
  appKey: "YEXH3kL8fo6DW4ORrYptEMTu",
  serverURL: "https://gmxqqsuu.lc-cn-n1-shared.com",
});

export async function guestLogin() {
  const username = randomString(8);
  const password = "guest";
  return AV.User.logIn(username, password);
}

export async function loginAnonymously() {
  return AV.User.loginAnonymously();
}

export async function updateScore() {
  console.log(AV.User.current());
  if (!AV.User.current()) {
    await loginAnonymously();
  }
  console.log(AV.User.current());
  return AV.Leaderboard.updateStatistics(AV.User.current(), {
    Eliminate: 3458,
  }).catch(console.error);
}

export async function getScoreList() {
  var leaderboard = AV.Leaderboard.createWithoutData("Eliminate");
  return leaderboard
    .getResults({
      limit: 10,
      skip: 0,
    })
    .catch(console.error);
}

// 当前玩家需要先登录
// AV.User.logIn('playerA', 'guest').then((loggedInUser) => {
//     // 查询另一个玩家在排行榜中的成绩
//     var otherUser = AV.Object.createWithoutData(AV.User, '5cee072ac8959c0069f62ca8');
//     return AV.Leaderboard.getStatistics(otherUser, {statisticNames: ['score', 'kills']});
//   }).then(function(statistics) {
//     // statistics 是查询的成绩结果
//   }).catch(function (error) {
//       // 异常处理
//   });
