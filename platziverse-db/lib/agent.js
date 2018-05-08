'user strict'

module.exports = function setupAgent (AgentModel) {
  async function createOrUpdate(agent) {
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }

    const existingAgent = await AgentModel.findOne(cond)

    if (existingAgent) {
      const updated = await AgentModel.update(agent, cond)
      return updated ? AgentModel.findOne(cond) : existingAgent
    }

    const results = await AgentModel.create(agent)
    return results.toJSON()
  }

  function findById(id) {
    return AgentModel.findById(id)
  }

  return {
    createOrUpdate,
    findById
  }
}
