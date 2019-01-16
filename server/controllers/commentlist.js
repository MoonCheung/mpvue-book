const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const { bookid } = ctx.request.query
  const comments = await mysql('comments')
                          .select('comments.*', 'csessioninfo.user_info')
                          .join('csessioninfo','comments.openid', 'csessioninfo.open_id')
                          .where('bookid', bookid);
  ctx.state.data = {
    list: comments.map(v=>{
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}
