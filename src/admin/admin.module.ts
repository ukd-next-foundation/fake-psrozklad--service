import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import AdminJS, { ComponentLoader } from 'adminjs';

AdminJS.registerAdapter({ Database, Resource });

const componentLoader = new ComponentLoader();
const components = {
  ImportPage: componentLoader.add('ImportPage', '../imports/page/ImportPage'),
};

const client = new PrismaClient();
const resources = Object.values(Prisma.ModelName).map((name) => ({
  resource: { client, model: getModelByName(name) },
}));

export const AdminJsModule = AdminModule.createAdmin({
  adminJsOptions: {
    branding: {
      companyName: 'Fake ПС-Розклад admin',
    },
    rootPath: '/admin',
    componentLoader,
    resources,
    pages: {
      ImportResources: {
        component: components.ImportPage,
      },
    },
  },
});
