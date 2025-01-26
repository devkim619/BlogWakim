export default ({ env }: { env: (key: string, defaultValue?: string) => string }) => {
  const apiUrl = env('SUPABASE_API_URL');
  const bucket = env('SUPABASE_BUCKET');
  const directory = env('SUPABASE_DIRECTORY', '');
  const apiKey = env('SUPABASE_API_KEY');

  return {
    upload: {
      config: {
        provider: 'strapi-provider-upload-supabase',
        providerOptions: {
          apiUrl,
          apiKey,
          bucket,
          directory,
          options: {},
        },
        actionOptions: {
          upload: async (file) => {
            try {
              const filePath = `${directory}/${file.hash}${file.ext}`;
              const uploadUrl = `${apiUrl}/storage/v1/object/${bucket}/${filePath}`;

              const buffer = file.buffer instanceof ArrayBuffer 
                ? file.buffer 
                : file.buffer.buffer.slice(
                    file.buffer.byteOffset, 
                    file.buffer.byteOffset + file.buffer.byteLength
                  );

              const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': file.mime,
                  'x-upsert': 'true', // Allow overwriting existing files
                },
                body: buffer,
              });

              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Upload failed: ${errorText}`);
              }

              // Construct public URL
              const publicUrl = `${apiUrl}/storage/v1/object/public/${bucket}/${filePath}`;

              return { 
                url: publicUrl,
                key: filePath 
              };
            } catch (error) {
              console.error('Supabase upload error:', error);
              throw error;
            }
          },

          uploadStream: async (file) => {
            try {
              const filePath = `${directory}/${file.hash}${file.ext}`;
              const uploadUrl = `${apiUrl}/storage/v1/object/${bucket}/${filePath}`;
          
              // ตรวจสอบว่า file.stream เป็น ReadableStream
              if (!(file.stream instanceof ReadableStream)) {
                throw new Error('file.stream is not a valid ReadableStream.');
              }
          
              const chunks = [];
              for await (const chunk of file.stream) {
                chunks.push(chunk);
              }
              const buffer = Buffer.concat(chunks);
          
              const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': file.mime,
                  'x-upsert': 'true',
                },
                body: buffer,
              });
          
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Stream upload failed: ${errorText}`);
              }
          
              // สร้าง URL ที่สามารถเข้าถึงได้
              const publicUrl = `${apiUrl}/storage/v1/object/public/${bucket}/${filePath}`;
              return { 
                url: publicUrl,
                key: filePath 
              };
            } catch (error) {
              console.error('Supabase stream upload error:', error);
              throw error;
            }
          }
          ,

          delete: async (file) => {
            try {
              const filePath = file.key || `${directory}/${file.hash}${file.ext}`;
              const deleteUrl = `${apiUrl}/storage/v1/object/${bucket}/${filePath}`;

              const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                },
              });

              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Delete failed: ${errorText}`);
              }

              return true;
            } catch (error) {
              console.error('Supabase delete error:', error);
              throw error;
            }
          },
        },
      },
    },
  };
};