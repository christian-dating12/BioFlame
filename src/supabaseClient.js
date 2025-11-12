import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vnmsbxrmdndvbchvvyzj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubXNieHJtZG5kdmJjaHZ2eXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MTk5MTksImV4cCI6MjA3ODQ5NTkxOX0._vG85bXqgP7-OD8D4SFwCF_GdsTZ1a3mY-8JMHHUR1w' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
