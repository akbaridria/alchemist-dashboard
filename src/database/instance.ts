import { Database, Views } from '@/types';
import { createKysely } from '@vercel/postgres-kysely';


const db = createKysely<Database>();

// get all views
export const getViewsById = async (id: number): Promise<Views[]> => {
  const res = await db
    .selectFrom("page_views")
    .select(['page_views.id', 'page_views.views'])
    .where("page_views.id", "=", id)
    .execute()

  return res;
}

// update vies
export const updateViwes = async (id: number) => {
  await db.insertInto("page_views")
    .values({
      id: id,
      views: 1
    }).onConflict((c) =>
      c.column("id")
      .doUpdateSet((eb) => ({
        views: eb("page_views.views", "+", 1)
      }))
    ).execute()

  const res = await db.selectFrom("page_views")
  .select("page_views.views")
  .where("page_views.id", "=", id)
  .execute()

  return res[0]
}