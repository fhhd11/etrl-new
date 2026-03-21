const path = require('path');
const mongoose = require('mongoose');
const { logger } = require('@librechat/data-schemas');
const { AccessRoleIds, PrincipalType, ResourceType, Tools } = require('librechat-data-provider');

require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { createModels, createMethods } = require('../packages/data-schemas/dist/index.cjs');

const DEFAULT_AGENT_ID = 'etrl-default-agent';
const DEFAULT_AGENT_NAME = 'ETRL AI';
const DEFAULT_MODEL = 'etrl-ai';
const DEFAULT_PROVIDER = 'litellm';
const DEFAULT_AUTHOR_ID = new mongoose.Types.ObjectId('69a1647a17f64863ae096c26');
const DEFAULT_INSTRUCTIONS = [
  'You are ETRL AI, the single default assistant for the ETRL Chat product.',
  'Be useful across general chat, file analysis, coding help, web research, and tool use.',
  'Prefer clear, direct answers, ask clarifying questions when needed, and use tools only when they improve the result.',
  'When possible, summarize outcomes, highlight next actions, and keep responses concise but complete.',
].join('\n\n');

async function seedDefaultAgent() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('Please define the MONGO_URI environment variable');
  }

  await mongoose.connect(mongoUri, { bufferCommands: false });

  const models = createModels(mongoose);
  const methods = createMethods(mongoose);
  const { Agent, AclEntry, AccessRole } = models;

  await methods.seedDefaultRoles();

  const existing = await Agent.findOne({ id: DEFAULT_AGENT_ID }).lean();
  let agent = existing;

  const agentData = {
    author: DEFAULT_AUTHOR_ID,
    id: DEFAULT_AGENT_ID,
    name: DEFAULT_AGENT_NAME,
    description: 'Canonical default ETRL agent for all users',
    instructions: DEFAULT_INSTRUCTIONS,
    provider: DEFAULT_PROVIDER,
    model: DEFAULT_MODEL,
    tools: [Tools.file_search, Tools.web_search, Tools.execute_code],
    conversation_starters: [
      'Помоги мне с задачей',
      'Проанализируй загруженный файл',
      'Найди информацию в интернете',
    ],
    category: 'general',
    isCollaborative: false,
    version: 1,
    mcpServerNames: [],
    artifacts: 'true',
  };

  if (!agent) {
    logger.info(`Creating canonical agent ${DEFAULT_AGENT_ID}`);
    agent = await Agent.create({
      ...agentData,
    });
  } else {
    logger.info(`Canonical agent ${DEFAULT_AGENT_ID} already exists, updating core fields`);
    await Agent.updateOne(
      { id: DEFAULT_AGENT_ID },
      {
        $set: {
          author: DEFAULT_AUTHOR_ID,
          name: DEFAULT_AGENT_NAME,
          description: agentData.description,
          instructions: agentData.instructions,
          provider: DEFAULT_PROVIDER,
          model: DEFAULT_MODEL,
          tools: agentData.tools,
          conversation_starters: agentData.conversation_starters,
          category: agentData.category,
          artifacts: agentData.artifacts,
        },
      },
    );
    agent = await Agent.findOne({ id: DEFAULT_AGENT_ID }).lean();
  }

  if (agent?._id) {
    const viewerRole = await AccessRole.findOne({ accessRoleId: AccessRoleIds.AGENT_VIEWER }).lean();
    if (!viewerRole) {
      throw new Error('Missing AGENT_VIEWER role after seeding default roles');
    }

    await AclEntry.updateOne(
      {
        principalType: PrincipalType.PUBLIC,
        resourceType: ResourceType.AGENT,
        resourceId: agent._id,
      },
      {
        $set: {
          principalType: PrincipalType.PUBLIC,
          principalId: null,
          resourceType: ResourceType.AGENT,
          resourceId: agent._id,
          permBits: viewerRole.permBits,
          roleId: viewerRole._id,
          grantedBy: agent._id,
        },
      },
      { upsert: true },
    );
  }

  logger.info('Canonical default agent is ready', {
    id: DEFAULT_AGENT_ID,
    model: DEFAULT_MODEL,
    provider: DEFAULT_PROVIDER,
  });
}

seedDefaultAgent()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Failed to seed canonical default agent', error);
    process.exit(1);
  });
