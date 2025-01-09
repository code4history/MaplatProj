import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';

expect.extend({ toBeInTheDocument });