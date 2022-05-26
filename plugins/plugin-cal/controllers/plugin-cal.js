'use strict';

/**
 * plugin-cal.js controller
 *
 * @description: A set of functions called "actions" of the `plugin-cal` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok, again'
    });
    
  },
  getMessage: async(ctx)=>{
    const response = axios.get('http://localhost:1337/tests')
    console.log("respsones is ",response);
  },
  postMessage: async(ctx)=>{
    const data = ctx.request.body
    
    const result = await strapi.entityService.create({data}, {models: "plugins::plugin-cal.message"})
    // result = await strapi.query(models, plugin-cal).create(data)
    return result;
  }
};