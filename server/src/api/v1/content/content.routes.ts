import { Router, type Request } from 'express';
import { prisma } from '../../../config/database.js';
import { settingsRoutes } from './settings.routes.js';
import { createListResource } from './listResource.js';
import {
  createVideoSchema,
  updateVideoSchema,
  createPhotoSchema,
  updatePhotoSchema,
  createStatSchema,
  updateStatSchema,
  createStorySchema,
  updateStorySchema,
  createActivitySchema,
  updateActivitySchema,
  createBoardMemberSchema,
  updateBoardMemberSchema,
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from './content.validation.js';

export const contentRoutes = Router();

contentRoutes.use('/settings', settingsRoutes);

contentRoutes.use(
  '/videos',
  createListResource({
    delegate: prisma.homeVideo,
    createSchema: createVideoSchema,
    updateSchema: updateVideoSchema,
  }),
);

contentRoutes.use(
  '/photos',
  createListResource({
    delegate: prisma.galleryPhoto,
    createSchema: createPhotoSchema,
    updateSchema: updatePhotoSchema,
  }),
);

contentRoutes.use(
  '/stats',
  createListResource({
    delegate: prisma.impactStat,
    createSchema: createStatSchema,
    updateSchema: updateStatSchema,
  }),
);

contentRoutes.use(
  '/stories',
  createListResource({
    delegate: prisma.story,
    createSchema: createStorySchema,
    updateSchema: updateStorySchema,
  }),
);

contentRoutes.use(
  '/activities',
  createListResource({
    delegate: prisma.activity,
    createSchema: createActivitySchema,
    updateSchema: updateActivitySchema,
    buildWhere: (req: Request) => (req.query.group ? { group: req.query.group as string } : undefined),
  }),
);

contentRoutes.use(
  '/team/board',
  createListResource({
    delegate: prisma.boardMember,
    createSchema: createBoardMemberSchema,
    updateSchema: updateBoardMemberSchema,
  }),
);

contentRoutes.use(
  '/team/members',
  createListResource({
    delegate: prisma.teamMember,
    createSchema: createTeamMemberSchema,
    updateSchema: updateTeamMemberSchema,
  }),
);
