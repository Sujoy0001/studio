import { supabase } from "../supabase/Client";

export async function getTeamData() {
  const { data, error } = await supabase.from("team").select("*").order("id", { ascending: true });
  if (error) console.error("Fetch error:", error);
  return data || [];
}

export async function addTeamMember(member) {
  const { data, error } = await supabase.from("team").insert([member]);
  if (error) console.error("Insert error:", error);
  return { data, error };
}

export async function updateTeamMember(id, updates) {
  const { data, error } = await supabase.from("team").update(updates).eq("id", id);
  if (error) console.error("Update error:", error);
  return { data, error };
}

export async function deleteTeamMember(id) {
  const { error } = await supabase.from("team").delete().eq("id", id);
  if (error) console.error("Delete error:", error);
  return { success: !error };
}
