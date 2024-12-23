export default ({ env }) => ({
    upload: {
        provider: 'supabase',
        providerOptions: {
            supabaseUrl: env('SUPABASE_URL'),
            supabaseApiKey: env('SUPABASE_API_KEY'),
            bucket: env('SUPABASE_BUCKET'),
            directory: env('SUPABASE_DIRECTORY'),
        },
    },
});
