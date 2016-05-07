import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Index from '../components/Index.js';

describe('app', () => {
  it('renders without problems', () => {
    const app = TestUtils.renderIntoDocument(<Index />);
    expect(app).to.exist;
  });
});

