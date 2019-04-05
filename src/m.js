// {
//   "id": 1,
//   "name": "广东",
//   "cities": [
//       {
//           "id": 4,
//           "province_id": 1,
//           "name": "广州",
//           "a_districts": [
//               {
//                   "id": 1,
//                   "city_id": 4,
//                   "name": "白云区",
//                   "areas": [
//                       {
//                           "id": 1,
//                           "a_district_id": 1,
//                           "name": "白云大道"
//                       },
//                       {
//                           "id": 2,
//                           "a_district_id": 1,
//                           "name": "钟落潭"
//                       }
//                   ]
//               },
//               {
//                   "id": 2,
//                   "city_id": 4,
//                   "name": "天河区",
//                   "areas": [
//                       {
//                           "id": 3,
//                           "a_district_id": 2,
//                           "name": "天河城"
//                       },
//                       {
//                           "id": 4,
//                           "a_district_id": 2,
//                           "name": "石牌"
//                       }
//                   ]
//               },
//               {
//                   "id": 3,
//                   "city_id": 4,
//                   "name": "海珠区",
//                   "areas": [
//                       {
//                           "id": 5,
//                           "a_district_id": 3,
//                           "name": "江南大道"
//                       },
//                       {
//                           "id": 6,
//                           "a_district_id": 3,
//                           "name": "琶洲"
//                       }
//                   ]
//               },
//               {
//                   "id": 4,
//                   "city_id": 4,
//                   "name": "越秀区",
//                   "areas": [
//                       {
//                           "id": 7,
//                           "a_district_id": 4,
//                           "name": "北京路"
//                       },
//                       {
//                           "id": 8,
//                           "a_district_id": 4,
//                           "name": "五羊新城"
//                       }
//                   ]
//               }
//           ]
//       },
//       {
//           "id": 5,
//           "province_id": 1,
//           "name": "佛山",
//           "a_districts": []
//       }
//   ]
// },

// let n = 0000
// ;{
//   console.log(n.toFixed())
// }

// let a =  /^\.\.?[/\\]/g.test("./../s")
// console.log(a);

let obj = {
  a: 1
}

for (let [k, v] of Object.entries(obj)) {
  console.log(k,v);
}
