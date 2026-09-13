'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {
  orderableDocumentListDeskItem,
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { StructureBuilder, structureTool } from 'sanity/structure';
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              id: 'orderable-projects',
              S,
              context,
            }),

            // Legg til en delelinje for ryddighet
            S.divider(),

            // 2. Hent automatisk inn alle de andre skjemaene dine!
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'project',
            ),
          ]);
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
