export default ({ env }: { env: (key: string, defaultValue?: string) => string }) => ({
    upload: {
      config: {
        provider: 'strapi-provider-upload-supabase',
        providerOptions: {
          apiUrl: env('SUPABASE_API_URL'), // URL ของ Supabase
          apiKey: env('SUPABASE_API_KEY'), // Service Role Key
          bucket: env('SUPABASE_BUCKET'), // ชื่อ Bucket
          directory: env('SUPABASE_DIRECTORY', ''), // ไดเรกทอรี (ปล่อยว่างถ้าไม่จำเป็น)
          options: {}, // ตัวเลือกเพิ่มเติม
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
        getFileURL: (file) => {
          const bucketName = env('SUPABASE_BUCKET'); // ชื่อ Bucket
          const directory = env('SUPABASE_DIRECTORY'); // ไดเรกทอรี
          const apiUrl = env('SUPABASE_API_URL'); // Base URL ของ Supabase
  
          // สร้าง URL แบบเต็ม
          return `${apiUrl}/storage/v1/object/public/${bucketName}/${directory}/${file.path}`;
        },
      },
    },
  });
  