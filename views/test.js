(function(grid) {
    let n = grid.length;
    if (n === 0) {
        return 0;
    }
    let m = grid[0].length;
    let dp = new Array(n + 1);
    for (let i = 0; i < n + 1; i++) {
        dp[i] = new Array(m + 1).fill(Infinity)
    }
    dp[n-1][m-1] = grid[n-1][m-1];
    // 自下而上
    for (let i = n - 2; i >= 0; i --) {
        for (let j = m - 2; j >= 0; j --) { // 走到当前坐标
            for (let ii = n - 1; ii > i; ii --) {
                if (dp[ii][j] !== Infinity) continue;
                dp[ii][j] = grid[ii][j] + Math.min(dp[ii + 1][j], dp[ii][j + 1]);
            }
            for (let jj = m - 1; jj > j; jj--) {
                if (dp[i][jj] !== Infinity) continue;
                dp[i][jj] = grid[i][jj] + Math.min(dp[i + 1][jj], dp[i][jj + 1]);
            }
            dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
        }
    }
    return dp[0][0];
})([[1,3,1],[1,5,1],[4,2,1]])
