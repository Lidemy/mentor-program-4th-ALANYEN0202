function search(arr,t) {
    var R = arr.length-1
    var L = 0
    while (L <= R) {
      var M =Math.floor((R+L)/2)
      if (arr[M] === t) {
        return M
      } else if(arr[M] > t) {
        R = M - 1
      } else {
        L = M + 1
      } 
    }
    return -1
  }
console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299)) 
