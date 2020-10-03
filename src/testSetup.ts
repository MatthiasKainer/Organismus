import '@testing-library/jest-dom/extend-expect';
import { organism } from './base';
import { hypothalamus } from './hypothalamus';

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

beforeEach(() => {
    jest.resetAllMocks()
    hypothalamus.dropAll()
    Object.keys(organism).forEach((entry) => delete organism[entry])
})