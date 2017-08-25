
const expect = require('chai').expect,
      Selector = require('testcafe').Selector,
      getElement = Selector(sel => document.querySelector(sel));

fixture('index').page('http://127.0.0.1:5000');

test('should contain a heading containing the task title', async t => {
    const heading = await t.select('h1');
    expect(heading.innerText).to.equal('Example Title');
});
