import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ldajrhaebxxifxitrfyu.supabase.co'
const supabaseAnonKey = 'sb_publishable_H3VnMnJZY4GtvNI_1M0dUA_Ud1kqmGB'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

