import Dexie from "dexie";
export const db = new Dexie("hr_pro_db");
db.version(1).stores({
  Baiviet:
    "++id,user,username,noidung,location_name,long_location,lat_location, updated_at, created_at",
});
