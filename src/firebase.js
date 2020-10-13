import * as fb from 'firebase/app';
import config from './config/firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();

export default firebase;
