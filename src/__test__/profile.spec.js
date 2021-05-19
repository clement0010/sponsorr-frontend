const firebase = require('@firebase/rules-unit-testing');
const fs = require('fs');
// const http = require('http');
const faker = require('faker');

const PROJECT_ID = '1016952785325';

const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;

function getAuthedFirestore(auth) {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore();
}

beforeEach(async () => {
  //   await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

before(async () => {
  const rules = fs.readFileSync('firestore.rules', 'utf8');
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));

  console.log(`Done testing!`);
});

describe('User login to profile', () => {
  const result = {
    user: {
      uid: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
      lastLogin: faker.date.past(),
    },
    anotherUser: {
      uid: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
      lastLogin: faker.date.past(),
    },
  };
  it('require users to log in before creating a profile', async () => {
    const db = getAuthedFirestore(null);
    const profile = db.collection('users').doc(result.user.uid);
    await firebase.assertFails(profile.set({ birthday: 'January 1' }));
  });

  it('should only let users create their own profile', async () => {
    const db = getAuthedFirestore(result.user);

    await firebase.assertSucceeds(
      db
        .collection('users')
        .doc(result.user.uid)
        .set({
          ...result.user,
        })
    );
    await firebase.assertFails(
      db
        .collection('users')
        .doc(result.anotherUser.uid)
        .set({
          ...result.anotherUser,
        })
    );
  });

  it('should let anyone read any profile', async () => {
    const db = getAuthedFirestore(null);
    const profile = db.collection('users').doc(faker.datatype.uuid());
    await firebase.assertSucceeds(profile.get());
  });
});
