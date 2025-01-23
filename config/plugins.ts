<<<<<<< HEAD
module.exports = ({ env }: { env: any }) => ({
    upload: {
        config: {
            provider: 'strapi-provider-upload-supabase',
            providerOptions: {
                apiUrl: env('SUPABASE_API_URL'),
                apiKey: env('SUPABASE_API_KEY'),
                bucket: env('SUPABASE_BUCKET'),
                directory: env('SUPABASE_DIRECTORY'),
                options: {},
            },
            actionOptions: {
                upload: {}, // ใช้แค่ upload
                delete: {},
            },
        },
    },
});
=======
export default ({ env }: { env: (key: string, defaultValue?: string) => string }) => {
    const apiUrl = env('SUPABASE_API_URL');
    const bucket = env('SUPABASE_BUCKET');
    const directory = env('SUPABASE_DIRECTORY', '');
  
    return {
      upload: {
        config: {
          provider: 'strapi-provider-upload-supabase',
          providerOptions: {
            apiUrl,
            apiKey: env('SUPABASE_API_KEY'),
            bucket,
            directory,
            options: {},
          },
          actionOptions: {
            upload: async (file) => {
              // Handle file upload using Buffer (Alternative to uploadStream)
              const filePath = `${directory}/${file.hash}${file.ext}`;
  
              // Use Supabase API to upload the file
              const response = await fetch(`${apiUrl}/storage/v1/object/${bucket}/${filePath}`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${env('SUPABASE_API_KEY')}`,
                  'Content-Type': file.mime,
                },
                body: file.buffer,  // Use the buffer directly for upload
              });
  
              if (!response.ok) {
                throw new Error('Failed to upload file');
              }
  
              return { url: `${apiUrl}/storage/v1/object/public/${bucket}/${filePath}` };
            },
            delete: {},
          },
        },
      },
    };
  };
  
>>>>>>> 6dea755feb3658a145f2a79aaa6bd5bd2b0c759a
