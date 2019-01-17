const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const { bookid, openid } = ctx.request.query
  const mysqlSelect = mysql('comments')
                        .select('comments.*', 'csessioninfo.user_info')
                        .join('csessioninfo','comments.openid', 'csessioninfo.open_id')
  let comments;
  if(bookid){
    comments = await mysqlSelect.where('bookid', bookid);
    //图书详情页评论列表
  }else if(openid){
    //根据个人的opid筛选
    comments = await mysqlSelect.where('openid', openid);
  }
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
