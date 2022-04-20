import faker from 'faker';

export interface Post {
  id: string;
  message: string;
  songId: string;
  createdAt: string;
  updatedAt: string;
  user:{
    id: string;
    name: string;
    avatar: string;
  }
}


const songIdsForMocks = ['4cOdK2wGLETKBW3PvgPWqT', '6BqdNDLZ3Pdcly46pu6nwj']

export const generateMockPost = () => {
  const randomNum = Math.floor(Math.random() * 100)+100
  return {
    id: faker.random.uuid(),
    message: faker.lorem.sentence(),
    songId: songIdsForMocks[Math.floor(Math.random() * songIdsForMocks.length)],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      avatar: `https://placeimg.com/${randomNum}/${randomNum}/any`,
    },
  };
}