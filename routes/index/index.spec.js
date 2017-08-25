
const expect = require('chai').expect,
      routes = require('./index'),
      request = {};

const response = {
    viewName: '',
    data : {},
    render(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    }
};

describe('Testing Index Route', () => {

    it('should render the master view', () => {
        routes.index(request, response);
        expect(response.viewName).to.equal('master');
    });

    it('should render the master view with the head data', () => {
        routes.index(request, response);
        expect(response.data.head).to.have.property('title');
    });

});
