import { Router } from 'express';
import { prisma } from '../../../config/database.js';
import { settingsRoutes } from './settings.routes.js';
import { createListResource } from './listResource.js';
import { imageRoutes } from './images/image.routes.js';
import { rawPhotoRoutes } from './raw-photos/raw-photo.routes.js';
import { whgGalleryRoutes } from './whg-gallery/whg-gallery.routes.js';
import { lacGalleryRoutes } from './lac-gallery/lac-gallery.routes.js';
import { hrdsGalleryRoutes } from './hrds-gallery/hrds-gallery.routes.js';
import { cwgGalleryRoutes } from './cwg-gallery/cwg-gallery.routes.js';
import { fsedsGalleryRoutes } from './fseds-gallery/fseds-gallery.routes.js';
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
  createNoticeSchema,
  updateNoticeSchema,
} from './content.validation.js';

export const contentRoutes = Router();

contentRoutes.use('/settings', settingsRoutes);
contentRoutes.use('/images', imageRoutes);
contentRoutes.use('/raw-photos', rawPhotoRoutes);
contentRoutes.use('/whg-gallery', whgGalleryRoutes);
contentRoutes.use('/lac-gallery', lacGalleryRoutes);
contentRoutes.use('/hrds-gallery', hrdsGalleryRoutes);
contentRoutes.use('/cwg-gallery', cwgGalleryRoutes);
contentRoutes.use('/fseds-gallery', fsedsGalleryRoutes);

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
    imageField: 'src',
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

contentRoutes.use(
  '/notices',
  createListResource({
    delegate: prisma.notice,
    createSchema: createNoticeSchema,
    updateSchema: updateNoticeSchema,
    imageField: 'imageUrl',
  }),
);
