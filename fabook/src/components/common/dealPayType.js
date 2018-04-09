/* eslint-disable */
module.exports = {
  returnType(payType) {
    var result;
    if (payType == 200) result = '全部'
    if (payType == 201) result = '餐饮'
    if (payType == 202) result = '服饰'
    if (payType == 203) result = '交通'
    if (payType == 204) result = '娱乐'
    if (payType == 205) result = '社交'
    if (payType == 206) result = '家居'
    if (payType == 207) result = '通讯'
    if (payType == 208) result = '美容'
    if (payType == 209) result = '运动'
    if (payType == 210) result = '医疗'
    if (payType == 211) result = '学习'
    if (payType == 212) result = '理财'
    if (payType == 213) result = '宠物'
    if (payType == 299) result = '其他'
    if (payType == 100) result = '全部'
    if (payType == 101) result = '工资'
    if (payType == 102) result = '兼职'
    if (payType == 103) result = '理财收益'
    if (payType == 104) result = '人情'
    if (payType == 199) result = '其他'
    return result
  }
};
