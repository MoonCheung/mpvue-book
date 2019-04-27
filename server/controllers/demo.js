module.exports = async (ctx, next) => {
  ctx.state.data = {
    msg: 'hello 小程序生成API'
  }
}
