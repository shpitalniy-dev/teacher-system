// import * as mockActions from "../../../../mockData/mockActions";
// import * as actions from "../actions";

// describe("Converter actions", () => {
//    it("changeConverterActiveMode", () => {
//        const expected = mockActions.changeConverterActiveMode("payload");
//        const actual = actions.changeConverterActiveMode("payload");
//        assert.deepEqual(expected, actual);
//    })
// });

import * as logic from "../../modules/converter/logic/logic";

describe(`Test Converter logic`, () => {
    it(`100 meters in versts`, () => {
        const actualValue = 100;
        let actualConvertFrom = 'meters';
        let actualConvertTo = 'versts';
        let expected = 0.09;

        let functionResult = logic.getValuesConvertedValue(actualValue, actualConvertFrom, actualConvertTo);

        assert.equal(expected, functionResult);
    })
});
