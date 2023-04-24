import { createClient } from "@supabase/supabase-js";
const URL = "https://odirynkwtpchmhgzykse.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kaXJ5bmt3dHBjaG1oZ3p5a3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyMDYxMTgsImV4cCI6MTk5Nzc4MjExOH0.zhAGxCfacJPHWd_8dszogLoe5fsCRAwNipLZogIYlMU";
export const supabase = createClient(URL, API_KEY);
