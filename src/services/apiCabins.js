import supabase, { supabaseUrl } from "./supabase";

export async function getCapins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(cabinData, id) {
  console.log({ cabinData, id });
  const hasImageUrl = cabinData.image?.startsWith?.(supabaseUrl);
  //generate image name
  const imageName = `${Math.random()}-${cabinData.image.name}`.replace("/", "");

  const imageURL = hasImageUrl
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // creating cabin
  if (!id) query = query.insert([{ ...cabinData, image: imageURL }]);

  // edit Cabin

  if (id) query = query.update({ ...cabinData, image: imageURL }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Could not ${id ? "Edit" : "Create"} the Cabin !`);
  }

  // uploading image
  if (hasImageUrl) return data;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  if (imageError) {
    console.error(imageError);
    await deleteCapin(data.id);
    throw new Error("Could not upload the Cabin image !");
  }
  return data;
}

export async function deleteCapin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return null;
}
