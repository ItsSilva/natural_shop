import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iysdhblxhuzvmbqsqirk.supabase.co'
const supabaseKey = 'sb_publishable_G0f0SzyBvF7QEYl_Iq2dsg_uvh0T6Ta'

export const supabase = createClient(supabaseUrl, supabaseKey)