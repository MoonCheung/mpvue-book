const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const { openid, bookid, comment, location, phone } = ctx.request.body
    console.log(openid, bookid, comment, location, phone)
    try {
        await mysql('comments').insert({ openid, bookid, comment, location, phone })
        ctx.state.data = {
            msg: '插入数据库成功！'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败: ' + e.sqlMessage
            }
        }
    }
}
