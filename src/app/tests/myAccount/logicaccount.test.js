import * as app from "../../modules/myAccount/logic/helpers/helpers";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
let container;
describe("testing  validation func", ()=> {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);

    });
    afterEach(() => {
        container.remove();
        container = null;
    });
    describe("testing  checkLogin", ()=> {
        it("should return false because value is number ", async () => {
            // global.tmp = tmp;
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = 111;
            assert.equal(app.checkLogin(input2, input), false);
        });
        it("should return sting Bob because it valid", async () => {
            // global.tmp = tmp;
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = "Bob";
            assert.equal(app.checkLogin(input2, input), "Bob");
        });
    });
    describe("testing  checkPhoneNumber", ()=> {
        it("should return false because value is not valid ", async () => {
            // global.tmp = tmp;
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = 111;
            assert.equal(app.checkPhoneNumber(input2, input), false);
        });
        it("should return number 999999999  because it valid", async () => {
            // global.tmp = tmp;
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = 999999999;
            assert.equal(app.checkPhoneNumber(input2, input), 999999999);
        });
    });
    describe("testing  checkMail", ()=> {
        it("should return false because value is not valid ", async () => {
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = 111;
            assert.equal(app.checkMail(input2, input), false);
        });
        it("should return sdsds@gmail.com because it valid", async () => {
            const input2 = dom.window.document.createElement("input");
            container.append(input2);
            global.input2 = input2;
            const input = dom.window.document.createElement("input");
            container.append(input);
            global.input = input;
            input2.value = "sdsds@gmail.com";
            assert.equal(app.checkMail(input2, input), "sdsds@gmail.com");
        });
    });
    // test('A request without authentication header, should return http status 403', () => {
    //     const request = httpMocks.createRequest({
    //         method: 'GET',
    //         url: '/user/42',
    //         headers: {
    //             authentication: ''
    //         }
    //     });
    //     const response = httpMocks.createResponse();
    //     unitUnderTest(request, response);
    //     expect(response.statusCode).toBe(403);
    // });
});