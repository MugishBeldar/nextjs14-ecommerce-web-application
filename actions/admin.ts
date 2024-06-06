import { getAdminDetailsDB } from "@/data/admin"

export async function getAdminDetails(id:string) {
  try {
    const response = await getAdminDetailsDB(id);
    return response;
  } catch (error) {
    console.log('getAdminDetails ~ error:', error)
  }
}