import {
    getFirestore
} from 'firebase/firestore'

import {initializeApp} from 'firebase/app'
import firebaseConfig from './firebase-config'

initializeApp(firebaseConfig)
const db=getFirestore()

export default db
