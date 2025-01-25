export default {
    routes: [
      {
        method: 'GET',
        path: '/users/me',
        handler: 'user.me', // ชี้ไปยัง Controller `me`
        config: {
          auth: true, // ต้อง Authenticated ถึงจะเรียกได้
        },
      },
    ],
  };
  