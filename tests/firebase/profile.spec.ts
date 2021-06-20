/* eslint-disable @typescript-eslint/no-var-requires */
import { beforeEach, before, after } from 'mocha';

const { readFileSync } = require('fs');

const { datatype, name: _name, internet, date } = require('faker');

const {
  initializeTestApp,
  loadFirestoreRules,
  apps,
  assertFails,
  assertSucceeds,
} = require('@firebase/rules-unit-testing');

const PROJECT_ID = '1016952785325';

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

interface Auth {
  uid: string;
}

function getAuthedFirestore(auth: Auth | undefined) {
  return initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
}

beforeEach(async () => {
  //   await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

before(async () => {
  const rules = readFileSync('firestore.rules', 'utf8');
  await loadFirestoreRules({ projectId: PROJECT_ID, rules });
});

after(async () => {
  console.log(`Done testing!`);
});

describe('User login to profile', () => {
  const result = {
    user: {
      uid: datatype.uuid(),
      name: _name.findName(),
      email: internet.email(),
      createdAt: date.past(),
      lastLogin: date.past(),
    },
    anotherUser: {
      uid: datatype.uuid(),
      name: _name.findName(),
      email: internet.email(),
      createdAt: date.past(),
      lastLogin: date.past(),
    },
  };
  it('require users to log in before creating a profile', async () => {
    const db = getAuthedFirestore(undefined);
    const profile = db.collection('users').doc(result.user.uid);
    await assertFails(profile.set({ birthday: 'January 1' }));
  });

  it('should only let users create their own profile', async () => {
    const db = getAuthedFirestore(result.user);

    await assertSucceeds(
      db
        .collection('users')
        .doc(result.user.uid)
        .set({
          ...result.user,
        }),
    );
    await assertFails(
      db
        .collection('users')
        .doc(result.anotherUser.uid)
        .set({
          ...result.anotherUser,
        }),
    );
  });

  it('should let anyone read any profile', async () => {
    const db = getAuthedFirestore(undefined);
    const profile = db.collection('users').doc(datatype.uuid());
    await assertSucceeds(profile.get());
  });
});
