# EnumManager
A simple and useful Enum Management Javascript library
## Install
```npm i enummanager```
## Usage
```
import {EnumManager} from "EnumManager";

const enumManager = new EnumManager();
// put(Enum Name, Tuple Array), every tuple likes [fieldName, value, description]
enumManager.put(
    "sex", [
    ["male", 1, "男性"],
    ["female", 0, "女性"]
]);
enumManager.put("region", [
    ["sichuan", "0838", "四川"],
    ["hunan", "0731", "湖南"]
]);
dict.get("sex").findByField("male")
// Output: { field: 'male', value: 1, desc: '男性' }
dict.get("sex").findByValue(0)
// Output: { field: 'female', value: 0, desc: '女性' }
dict.get("region").findByDesc("四川")
// Output: { field: 'sichuan', value: '0838', desc: '四川' }
dict.getList()
// Output: [
  { field: 'sichuan', value: '0838', desc: '四川' },
  { field: 'hunan', value: '0731', desc: '湖南' }
]
dict.has("sex")
// Output: true
```