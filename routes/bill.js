const router = require('koa-router')()
router.prefix('/bill')

const { Bill } = require('../models/index')

router.get('/list', async (ctx, next) => {
  let params = {
    isExist: true
  }
  ctx.request.query.type && (params.type = ctx.request.query.type)
  try {
    const data = await Bill.find(params)
    let resultData = data.map(item => {
      return {
        id: item._id,
        type: item.type,
        time: item.time,
        detail: item.detail,
        money: item.money,
        userId: item.userId
      }
    })
    ctx.body = {
      code: 200,
      data: resultData
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: error
    }
  }
});

router.post('/save', async (ctx, next) => {
  try {
    if (!ctx.request.body.type) throw '缺少参数type'
    if (!ctx.request.body.time) throw '缺少参数time'
    if (!ctx.request.body.money) throw '缺少参数money'

    let {
      type,
      time,
      money,
      detail
    } = ctx.request.body

    let bill = {
      type,
      time,
      money,
      detail,
      insertTime: Date.now()
    }
    const result = await Bill.create(bill)
    ctx.body = {
      code: 200,
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: error
    }
  }
});

router.post('/delete', async (ctx, next) => {
  try {
    let params = {
      _id: ctx.request.body.id
    }

    const result = await Bill.updateOne(params, { isExist: false })

    ctx.body = {
      code: 200,
      data: result.nModified === 1 ? '删除成功' : '删除失败'
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: error
    }
  }
});

router.post('/edit', async (ctx, next) => {
  try {
    if (!ctx.request.body.type) throw '缺少参数type'
    if (!ctx.request.body.time) throw '缺少参数time'
    if (!ctx.request.body.money) throw '缺少参数money'

    let {
      type,
      time,
      money,
      detail,
      id
    } = ctx.request.body

    let bill = {
      type,
      time,
      money,
      detail,
      insertTime: Date.now()
    }

    const result = await Bill.updateOne({_id: id}, bill)

    ctx.body = {
      code: 200,
      data: result.nModified === 1 ? '编辑成功' : '编辑失败'
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: error
    }
  }
});

module.exports = router;
