import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch'; // polyfill for fetch API

//this error might be able to be resolved by downgrading the entire thing https://stackoverflow.com/questions/61853262/testing-library-jest-dom-not-loading
import matchers from '@testing-library/jest-dom';

// extends Vitest's expect method with methods from react-testing-library

expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});