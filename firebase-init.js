/* Firebase Authentication initialization for the Snowline web app. */
(function initializeSnowlineFirebase() {
  const config = {
    apiKey: 'AIzaSyAowI6A7WMmemKQHi6Z0LbuGCj-83iF9yI',
    authDomain: 'sport-ai-makers-3d456.firebaseapp.com',
    projectId: 'sport-ai-makers-3d456',
    storageBucket: 'sport-ai-makers-3d456.firebasestorage.app',
    messagingSenderId: '291022104035',
    appId: '1:291022104035:web:5af32150b6bd86ed72acd6',
    measurementId: 'G-3DHF6T0BWG',
  };

  try {
    if (!window.firebase) throw new Error('Firebase SDK를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.');
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
    const auth = app.auth();
    const db = app.firestore();
    const ready = auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(error => {
      console.warn('브라우저의 로그인 저장을 사용할 수 없어 세션 저장으로 전환합니다.', error);
      return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(() =>
        auth.setPersistence(firebase.auth.Auth.Persistence.NONE));
    });
    window.snowlineFirebase = { app, auth, db, ready, projectId: config.projectId };
    ready.catch(error => {
      console.error('Firebase Authentication 초기화 실패:', error);
      window.snowlineFirebaseError = error;
    });
  } catch (error) {
    console.error('Firebase 초기화 실패:', error);
    window.snowlineFirebaseError = error;
  }
})();
