const router = require('koa-router')()
router.prefix('/type')

const { Type } = require('../models/index')

router.get('/list', async (ctx, next) => {
  let params = {
    isExist: true
  }
  ctx.request.query.type && (params.type = ctx.request.query.type)
  try {
    const data = await Type.find(params)
    let resultData = data.map(item => {
      return {
        label: item.typeName,
        value: item.value
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
    if (!ctx.request.body.typeName) throw '缺少参数typeName'

    let {
      typeName
    } = ctx.request.body

    let type = {
      typeName
    }
    const result = await Type.create(type)
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

    const result = await Type.updateOne(params, { isExist: false })

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
    if (!ctx.request.body.typeName) throw '缺少参数typeName'

    let {
      typeName,
      id
    } = ctx.request.body

    let type = {
      typeName
    }

    const result = await Type.updateOne({_id: id}, type)

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
